const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    todoList:[
        {
            task: {
                type: String,
                required:true
            },
            completed: {
                type: Boolean,
                required:true
            }
        } 
    ], 
    tokens: [
        {
            token: {
               type: String,
               required:true 
            }
        }
    ]
})


// we are hashing the password  
userSchema.pre('save', async function (next)
{
    if (this.isModified('password')) 
    {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

// add new item to list
userSchema.methods.addTodoList = async function (todoList) {
    try {
        this.todoList = [...this.todoList, todoList];
        await this.save();
        return this.todoList;
    } catch (error) {
        console.log(error)
    }
}

// delete item from list using _id
userSchema.methods.deleteTodoItem = async function (taskId) {
    try {
        this.todoList = this.todoList.filter((taskItem) => taskItem._id.valueOf() !== taskId._id);       
        await this.save();
    } catch (error) {
        console.log(error)
    }
}

// update check change on list item
userSchema.methods.checkChange = async function (taskId) {
    try {
        this.todoList = this.todoList.map((taskItem) => {
            if (taskItem._id.valueOf() == taskId._id){
                return {task: taskItem.task, completed: !taskItem.completed};
            }else{
                return taskItem;
            }
        }); 
        await this.save();
    } catch (error) {
        console.log(error)
    }
}

// update basic information
userSchema.methods.updateBasicInfo = async function (name, email, phone) {
    try {
        this.name = name;
        this.email = email;
        this.phone = phone;
        await this.save();
        return this;
    } catch (error) {
        console.log(error)
    }
}

// collection creation 
const User = mongooose.model('USER', userSchema);

module.exports = User;

