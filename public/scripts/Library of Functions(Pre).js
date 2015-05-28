var myPath=[];
var wander=function(){
	currentPlayer.newPath=true;
	currentPlayer.destination=true;
	currentPlayer.destinationX=Math.round(Math.random()*48)
	currentPlayer.destinationY=Math.round(Math.random()*48)
	pathFinder();
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
var seekPriorities=function(){ \r\n    if(currentPlayer.newPath){\r\n		pathFinder();\r\n	}\r\n}
	if(currentPlayer.newPath){
		pathFinder();
	}
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
var pathFinder=function(){
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
}
var direction=this.movement;
var stepOfPath=l;
var turnTurret=function(changeInAngle){
	if(changeInAngle<0){
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
