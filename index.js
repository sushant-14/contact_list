var express=require('express');
var path=require('path');
var port=8000

const db=require('./config/mongoose');
const Contact=require('./model/contact')

var app=express()

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
// middleware this is act as a bridge(it is responsipble for parsing the incoming request)
app.use(express.urlencoded())
// defined the css js images folder in assests.
app.use(express.static('assests'))
contactList=[
    {
        name:"Sushant",
        mob:"1234567890"
    },
    {
        name:"Kumar",
        mob:"985673211"
    },
    {
        name:"Prajapati",
        mob:"7654839222"
    }
]

app.get('/',function(req,res){
    // res.send("<h1>Hello that's cool bro</h1>")
    // use curly bracket the title which is rendering the html page and change the title
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home',
        {
            title:"Home page",
            contact_List:contacts,
            p:"Hello World"
    
        })

    })

    // return res.render('home',
    // {
    //     title:"Home page",
    //     contact_List:contactList,
    //     p:"Hello World"

    // })
})

app.get('/player',function(req,res){
    return res.render('player',{
        title:"Let play us"
    })
})

app.post('/create-contact',function(req,res){
    // redirect means it redirect to another page

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.mob);
    // also write this code in another short way
    // contactList.push({
    //     name:req.body.name,
    //     mob:req.body.mob
    // })
    
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        mob:req.body.mob
    },function(err,newContact){
        if(err){console.log('error in creating contact: ');
    return;}

    console.log("***********",newContact);
    return res.redirect('back')
    });


  //  // return res.redirect('back');
});

app.get('/delete-contact',function(req,res){
    // '/delete-contact/:mob'
    // console.log(req.params);
    // let mob=req.params.mob;
    console.log(req.query);
    // let mob=req.query.mob;
    // get the id from query in the url
    let id=req.query.id;
    // let contactIndex=contactList.findIndex(contact=>contact.mob==mob);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // find the contact
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in delelting an object from database');
            return;
        }
        return res.redirect('back');
    });
    // return res.redirect('back');
    
});

app.listen(port,function(err){
    if(err){console.log("error in server",err)}
    console.log("server is running on port: ",port)
})


// C:\Program Files\MongoDB\Server\6.0\data\ data directory
// C:\Program Files\MongoDB\Server\6.0\log\  log directoory