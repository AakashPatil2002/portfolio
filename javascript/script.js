window.addEventListener("load",()=>{
  let wrapper=document.getElementById('wrapper');
  let preloader=document.getElementById('loader');
  preloader.style.display="none";
  wrapper.style.display='block';
})
function playIt(){
  const sound=document.getElementById("sound");
  sound.play();
  console.log(sound);
}
function sendIt() {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const mail = document.getElementById("mail").value;
  const msg = document.getElementById("msg").value;
  axios.post(
    "https://66f540409aa4891f2a247fcb.mockapi.io/portfolio/portfolio",
    { name: name, email: mail, message: msg }
  );
  alert("form submitted successfully");
}
$(document).ready(() => {
  $('.owl-carousel').owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    autoplayTimeOut:1000
  });
  $(".bars").click(()=>{
    $(".offcan").css({"left":"0"})
  })
  $(".close, .off-nav-a").click(()=>{
    $(".offcan").css({"left":"-100%"})
  })

  $(".indeed").mouseover(function () { 
    $(".indeed").attr("src","./images/illustrations/indeed2.png")
  });
  $(".indeed").mouseout(function () { 
    $(".indeed").attr("src","./images/illustrations/indeed1.png")
  });
  $(".chart5").easyPieChart({
    barColor: "#0075A2",
    trackColor:"#222",
    size: 100,
    scaleLength: false,
    lineWidth:4
  });
  $("#nontechnical-details").slideUp()
  $("#technical-btn").click(()=>{
    $("#nontechnical-details").slideUp(1000,()=>{
      $("#technical-details").slideDown(1000)
    })
  })
  $("#nontechnical-btn").click(()=>{
    $("#technical-details").slideUp(1000,()=>{
      $("#nontechnical-details").slideDown(1000)
    })
  })
  // about animation===================================
  $("#experience_details").slideUp();
  $("#services_details").slideUp();
  $("#service_btn").click(()=>{
    $("#service_btn").addClass("activeLink");
    $("#education_btn").removeClass("activeLink")
    $("#experience_btn").removeClass("activeLink")

    $("#education_details").slideUp(1000,()=>{
      $("#services_details").slideDown(1000);
    })
    $("#experience_details").slideUp(1000,()=>{
      $("#services_details").slideDown(1000);
    })
  });
  $("#education_btn").click(()=>{
    
    $("#education_btn").addClass("activeLink");
    $("#service_btn").removeClass("activeLink")
    $("#experience_btn").removeClass("activeLink")

    $("#services_details").slideUp(1000,()=>{
      $("#education_details").slideDown(1000);
    })
    $("#experience_details").slideUp(1000,()=>{
      $("#education_details").slideDown(1000);
    })
  });
  $("#experience_btn").click(()=>{
    $("#experience_btn").addClass("activeLink");
    $("#service_btn").removeClass("activeLink")
    $("#education_btn").removeClass("activeLink");
    $("#services_details").slideUp(1000,()=>{
      $("#experience_details").slideDown(1000);
    })
    $("#education_details").slideUp(1000,()=>{
      $("#experience_details").slideDown(1000);
    })
  });

  // prj animation===============================
  $("#page2").slideUp()
  $("#next1").click(()=>{
    $("#page1").slideUp(1000)
    $("#page2").slideDown(1000)
  })
  $("#prev1").click(()=>{
    $("#page2").slideUp(1000)
      $("#page1").slideDown(1000)
  })

  // rect prj animation
  $(".prj-page4").slideUp();

  $("#rprev1").click(()=>{
    $(".prj-page4").slideUp(1000)
    $(".prj-page3").slideDown(1000)
  })
  $("#rnext1").click(()=>{
    $(".prj-page3").slideUp(1000)
    $(".prj-page4").slideDown(1000)
  })
 
  
});

var canvas = $("#wrapper-canvas").get(0);

var dimensions = {
  width: $(window).width(),
  height: $(window).height(),
};

Matter.use("matter-attractors");
Matter.use("matter-wrap");

function runMatter() {
  // module aliases
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create();

  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  // create renderer
  var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      showVelocity: false,
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: "#111",
    },
  });
  // create runner
  var runner = Runner.create();

  // Runner.run(runner, engine);
  // Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 15, dimensions.height / 15) / 2,
    {
      render: {
        fillStyle: `#111`,
        strokeStyle: `rgb(240,240,240)`,
        lineWidth: 0,
      },

      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    }
  );
  World.add(world, attractiveBody);

  // add some bodies that to be attracted
  for (var i = 0; i < 60; i += 1) {
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let s =
      Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
    let poligonNumber = Common.random(3, 6);
    var body = Bodies.polygon(
      x,
      y,
      poligonNumber,
      s,

      {
        mass: s / 80,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: "#222",
          strokeStyle: `#222`,
          lineWidth: 2,
        },
      }
    );

    World.add(world, body);

    let r = Common.random(0, 4);
    var circle = Bodies.circle(x, y, Common.random(2, 8), {
      mass: 0.1,
      friction: 0,
      frictionAir: 0.01,
      render: {
        fillStyle: r > 0.3 ? `rgb(129, 203, 253)` : `rgb(240,240,240)`,
        strokeStyle: `rgb(129, 203, 253)`,
        lineWidth: 2,
      },
    });

    World.add(world, circle);

    // var circle = Bodies.circle(x, y, Common.random(2, 20), {
    //   mass: 6,
    //   friction: 0,
    //   frictionAir: 0,
    //   render: {
    //     fillStyle: r > 0.3 ? `#4267F8` : `rgb(240,240,240)`,
    //     strokeStyle: `#3257E8`,
    //     lineWidth: 4 } });

    // World.add(world, circle);

    var circle = Bodies.circle(x, y, Common.random(2, 30), {
      mass: 0.2,
      friction: 0.6,
      frictionAir: 0.8,
      render: {
        fillStyle: `#121214`,
        strokeStyle: `#121214`,
        lineWidth: 3,
      },
    });

    World.add(world, circle);
  }

  // add mouse control
  var mouse = Mouse.create(render.canvas);

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) return;
    // smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.12,
      y: (mouse.position.y - attractiveBody.position.y) * 0.12,
    });
  });

  let data = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    play: function () {
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    },
  };

  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);
  return data;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setWindowSize() {
  let dimensions = {};
  dimensions.width = $(window).width();
  dimensions.height = $(window).height();

  m.render.canvas.width = $(window).width();
  m.render.canvas.height = $(window).height();
  return dimensions;
}

let m = runMatter();
setWindowSize();
$(window).resize(debounce(setWindowSize, 250));



