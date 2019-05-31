
var express=require("express");
var path=require("path");
var app=express();
var onoff = require("onoff");
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static("public"));
app.get("/",(req,res,next)=>{
    res.render("page");
var Gpio = onoff.Gpio, led = new Gpio(4,'out'), interval;
led.write(0);
    next();

})

app.get("/On",(res,req,next)=>{
    req.render("state",{
        message : "LED is on"
    });
var Gpio = onoff.Gpio, led = new Gpio(4,'out');
led.write(1);
    next();
})

app.get("/off",(res,req,next)=>{
    req.render("state",{
        message : "LED is off"
    });
var Gpio = onoff.Gpio, led = new Gpio(4,'out');
led.write(0);

    next();
})
app.get("/blink",(res,req,next)=>{
    req.render("state",{
        message : "LED is blinking"
    });
var Gpio = onoff.Gpio, led = new Gpio(4,'out'), interval;

interval = setInterval(function () {
	var value = (led.readSync() + 1)%2;
	led.write(value, function(){
		console.log("Changed the LED state to: " + value);
	});

} ,2000);

process.on('SIGINT' , function(){
	clearInterval(interval);
	led.writeSync(0);
	led.unexport();
	console.log('Bye, bye!');
	process.exit();
});
    next();
})
app.listen(3000,()=>{
    console.log("server Started")
})
