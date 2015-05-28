var wander=function(){
    currentPlayer.newPath=true;
    currentPlayer.destinationX=Math.round(Math.random()*48)
    currentPlayer.destinationY=Math.round(Math.random()*48)
    console.log("wandering to", currentPlayer.destinationX=Math.round(Math.random()*48), currentPlayer.destinationY)
}

if(currentPlayer.currentPriority===0&&l===0){
                wander();
                currentPriority=1;
            }

var _self = this.entity.script.client;
var tankDoThis = function(one, two){_self.socket.send(one, two)};
            tankDoThis('move',this.movement)
            easystar.setGrid(this.pathingMap);
            easystar.setAcceptableTiles([0]);
            easystar.enableDiagonals();

            this.tankPosition = tankPosition;
var stuck=function(){
    if(currentPlayer.lastCheckPoint+3000<Date.now()&&currentPlayer.currentPriority>0){
        currentPlayer.lastCheckPoint=Date.now
      return true  
    }
    return false;
} 
var completedPath=function(){
    if(l>myPath.length-2){
        return true
    }else{return false}
}
var followPath=function(){
    if (Math.abs(tankPosition[0]-(myPath[l].x))+Math.abs(tankPosition[2]-(myPath[l].y))<0.85){
        currentPlayer.lastCheckPoint=Date.now()
        l++; 
    }
    if (tankPosition[0]<myPath[l].x&&tankPosition[2]>myPath[l].y){
       this.movement[0]=1
       this.movement[1]=-1

    }
    if (tankPosition[0]>myPath[l].x&&tankPosition[2]<myPath[l].y){
        this.movement[0]=-1
        this.movement[1]=1
    }
    if(tankPosition[0]>myPath[l].x&&tankPosition[2]>myPath[l].y){
        this.movement[0]=-1
       this.movement[1]=-1
    }
    if(tankPosition[0]<myPath[l].x&&tankPosition[2]<myPath[l].y){
        this.movement[0]=1
       this.movement[1]=1
    }
    return this.movement
}
            
if(currentPlayer.newPath===true){
    currentPlayer.newPath=false;
    easystar.findPath(Math.round(tankPosition[0]), Math.round(tankPosition[2]), currentPlayer.destinationX, currentPlayer.destinationY, function( path ) {
        if (path === null) {
            console.log("Path was not found.");
            currentPlayer.currentPriority=0;
        } else {
            myPath=path;
        }
    });
    easystar.calculate();
    currentPlayer.destination=true;
}

var direction=this.movement;
var stepOfPath=l;
var turnTurret=function(changeInAngle){
    if(changeInAngle<0){
        console.log("what?", changeInAngle)
        if(currentPlayer.turretAngle+changeInAngle>-180){
                    currentPlayer.turretAngle+=changeInAngle
                }else{
                    currentPlayer.turretAngle=180;
                } 
               
    }else{
        if (currentPlayer.turretAngle+changeInAngle<180){
                    currentPlayer.turretAngle+=changeInAngle
                }else{
                    currentPlayer.turretAngle=-180;
                }
    }
     return currentPlayer.turretAngle;
}        
            //Above this shold not be visible
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
if(this.unstick>0){
    this.unstick--
}else{
    if(stuck()){
        wander();
        console.log("stuck")
        currentPlayer.currentPriority=1;
    }else{
        if (completedPath()){
           currentPlayer.destination=false;
           l=0;
           currentPlayer.currentPriority=0;
        }
        if(currentPlayer.destination===true&&myPath.length>0){
            direction=followPath();
        }
        if(direction[0]===0 && direction[1]===0){
            direction=randomDirection();
        }
    }
}  
if(currentPlayer.shootNow==="right"){
    currentPlayer.turretAngle=turnTurret(-3)
}else if(currentPlayer.shootNow==="left"){
    currentPlayer.turretAngle=turnTurret(3)
}else if(currentPlayer.shootNow===true || currentPlayer.shootNow===false){
    tankDoThis('shoot', currentPlayer.shootNow);
}
tankDoThis('shoot', currentPlayer.shootNow);
tankDoThis('move', direction);
tankDoThis('layMine', true);
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            //nothing below this should be visible:
            this.entity.script.tanks.own.targeting(currentPlayer.turretAngle);
            
            if(currentPlayer.turretAngle<=0){
                var neg=(currentPlayer.turretAngle+180)
            }else{
                var neg=(currentPlayer.turretAngle-180)
            }
            tankDoThis('target', neg);
            
            
            currentPlayer.movement=this.movement;

            // rotate vector
            
            var t =       this.movement[0] * Math.sin(Math.PI * 0.75) - this.movement[1] * Math.cos(Math.PI * 0.75);
            this.movement[1] = this.movement[1] * Math.sin(Math.PI * 0.75) + this.movement[0] * Math.cos(Math.PI * 0.75);
            this.movement[0] = t;