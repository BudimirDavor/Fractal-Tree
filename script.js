////declaracion de variable
var tree = [];
var floArr = [];

/////declaracion de funciones
class Rama{
    constructor(xi,yi,xf,yf,ww){
        this.vo = createVector(xi,yi);
        this.vf = createVector(xf,yf);
        this.vv = createVector(xf-xi,yf-yi);
        this.ww = ww*0.7;
        this.ta= 0;
    }
    get v(){return this.vv}
    get f(){return this.vf}
    get w(){return this.ww}
    get tamano(){return this.ta}
    
    updata(){
        if(this.ta<1){
            this.ta+= 0.04;
        }
    }
    show(){
        strokeWeight(this.ww);
        line(this.vo.x, this.vo.y, this.vo.x+ this.vv.x*this.ta,this.vo.y+ this.vv.y*this.ta);
    }
}
class Flower{
    constructor(x,y){
        this.xx = x;
        this.yy = y;
        this.ta= 0.5;
    }
    updata(){
        if(this.ta<3){
            this.ta+= 0.3;
        }
    }
    show(){
        push();
        noStroke();
        fill("red");
        circle(this.xx, this.yy, this.ta);
        pop();
    }
}

function treeGene(){
    let i = tree.length-1;
    tree.push([]);
    for(let r of tree[i]){
        let v1 = r.v.copy().mult(random (0.7,0.8)).rotate(-PI/6);
        let v2 = r.v.copy().mult(random (0.7,0.8)).rotate(PI/6);
            
        tree[i+1].push(new Rama (r.f.x, r.f.y, r.f.x+v1.x, r.f.y+v1.y,r.w));
        tree[i+1].push(new Rama (r.f.x, r.f.y, r.f.x+v2.x, r.f.y+v2.y,r.w));
    }
}    

////////setup and draw

function setup(){
    frameRate(60);
    createCanvas(400,400);
    background(255,255,200);
    
    tree.push([]);
    tree[0].push(new Rama(0,0, 0,-90, 28.5));
}

function draw(){
    
    translate(200,400);
    let ii = tree.length - 1;
    
    for(let i of tree[ii]){
        i.updata();
        i.show();
    }
    
    if(tree[ii][0].tamano > 1 && ii<10){
        treeGene();
        
    }else if(tree[ii][0].tamano > 1 && floArr.length == 0){
        for(let f of tree[ii]){
             floArr.push(new Flower(f.f.x, f.f.y));
        }
    }
    for(let j of floArr){
        j.updata();
        j.show();
    }
}