const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const lodash = require("lodash")

var title=""
var titles=[]
var t=""
var addToList=""
var addToLists=""
var titleName=""


const listSchema = new mongoose.Schema({
    name: String
})
const List = mongoose.model("today", listSchema)

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname))
app.set("view engine", "ejs")

app.get("/", function(req,res){
    List.find({}, function(err, items){
        res.render("index", {item: items})
    })
})
app.post("/", function(req,res){
    addToList=req.body.addToList
    const list = new List({
        name: addToList
    })
    list.save()
    res.redirect("/")
})

app.get("/:post", function(req,res){
    title = req.params.post
    titles.push(title)
    for(var i=0;i<titles.length;i++){
        t = titles[i]
        var List1 = mongoose.model(t, listSchema)
    }
    List1.find({}, function(err, itemss){
        res.render("extra", {title:title, item: itemss})
    })
    app.post("/"+title, function(req,res){
        addToLists = req.body.addToLists
        const lists = new List1({
            name: addToLists
        })
        lists.save()
        res.redirect("/"+title)
    })
    app.post("/"+title+"/delete", function(req,res){
        const checkedId = req.body.listName
        List1.findByIdAndRemove(checkedId, function(err, item){
            res.redirect("/"+title)
        })
    })
})

app.get("/create/list", function(req,res){
    res.render("create")
})
app.post("/create/list", function(req,res){
    titleName = req.body.titleName
    res.redirect("/"+titleName)
})

app.post("/delete", function(req,res){
    const checkedId = req.body.listName
    List.findByIdAndRemove(checkedId, function(err, item){
        res.redirect("/")
    })
})

mongoose.connect("mongodb+srv://9nimbu9:1234567890@projects.um6vp.mongodb.net/To-Do-List")
app.listen(process.env.PORT || 3000, function(){
    console.log("Server 3000")
})