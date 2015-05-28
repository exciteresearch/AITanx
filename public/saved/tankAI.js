var EasyStar=EasyStar||{};"function"==typeof define&&define.amd&&define("easystar",[],function(){return EasyStar}),"undefined"!=typeof module&&module.exports&&(module.exports=EasyStar),EasyStar.Node=function(t,n,i,e,s){this.parent=t,this.x=n,this.y=i,this.costSoFar=e,this.simpleDistanceToTarget=s,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}},EasyStar.Node.OPEN_LIST=0,EasyStar.Node.CLOSED_LIST=1,EasyStar.PriorityQueue=function(t,n){this.length=0;var i=[],e=!1;if(n==EasyStar.PriorityQueue.MAX_HEAP)e=!0;else{if(n!=EasyStar.PriorityQueue.MIN_HEAP)throw n+" not supported.";e=!1}this.insert=function(n){if(!n.hasOwnProperty(t))throw"Cannot insert "+n+" because it does not have a property by the name of "+t+".";i.push(n),this.length++,s(this.length-1)},this.getHighestPriorityElement=function(){return i[0]},this.shiftHighestPriorityElement=function(){if(0===this.length)throw"There are no more elements in your priority anfleulereue.";if(1===this.length){var t=i[0];return i=[],this.length=0,t}var n=i[0],e=i.pop();return this.length--,i[0]=e,o(0),n};var s=function(t){if(0!==t){var n=u(t);a(t,n)&&(r(t,n),s(n))}},o=function(t){var n=h(t),i=c(t);if(a(n,t))r(t,n),o(n);else if(a(i,t))r(t,i),o(i);else{if(0==t)return;o(0)}},r=function(t,n){var e=i[t];i[t]=i[n],i[n]=e},a=function(n,s){if(void 0===i[s]||void 0===i[n])return!1;var o,r;return"function"==typeof i[n][t]?(o=i[n][t](),r=i[s][t]()):(o=i[n][t],r=i[s][t]),e?o>r?!0:!1:r>o?!0:!1},u=function(t){return Math.floor(t/2)-1},h=function(t){return 2*t+1},c=function(t){return 2*t+2}},EasyStar.PriorityQueue.MAX_HEAP=0,EasyStar.PriorityQueue.MIN_HEAP=1,EasyStar.instance=function(){this.isDoneCalculating=!0,this.pointsToAvoid={},this.startX,this.callback,this.startY,this.endX,this.endY,this.nodeHash={},this.openList},EasyStar.js=function(){var t,n,i,e=10,s=14,o=!1,r={},a={},u={},h=!0,c=[],l=Number.MAX_VALUE,f=!1;this.setAcceptableTiles=function(t){t instanceof Array?i=t:!isNaN(parseFloat(t))&&isFinite(t)&&(i=[t])},this.enableSync=function(){o=!0},this.disableSync=function(){o=!1},this.enableDiagonals=function(){f=!0},this.disableDiagonals=function(){f=!1},this.setGrid=function(n){t=n;for(var i=0;i<t.length;i++)for(var e=0;e<t[0].length;e++)a[t[i][e]]||(a[t[i][e]]=1)},this.setTileCost=function(t,n){a[t]=n},this.setAdditionalPointCost=function(t,n,i){u[t+"_"+n]=i},this.removeAdditionalPointCost=function(t,n){delete u[t+"_"+n]},this.removeAllAdditionalPointCosts=function(){u={}},this.setIterationsPerCalculation=function(t){l=t},this.avoidAdditionalPoint=function(t,n){r[t+"_"+n]=1},this.stopAvoidingAdditionalPoint=function(t,n){delete r[t+"_"+n]},this.enableCornerCutting=function(){h=!0},this.disableCornerCutting=function(){h=!1},this.stopAvoidingAllAdditionalPoints=function(){r={}},this.findPath=function(n,s,r,a,u){var h=function(t){o?u(t):setTimeout(function(){u(t)})};if(void 0===i)throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");if(void 0===t)throw new Error("You can't set a path without first calling setGrid() on EasyStar.");if(0>n||0>s||0>r||0>r||n>t[0].length-1||s>t.length-1||r>t[0].length-1||a>t.length-1)throw new Error("Your start or end point is outside the scope of your grid.");if(n===r&&s===a)return h([]),void 0;for(var l=t[a][r],f=!1,y=0;y<i.length;y++)if(l===i[y]){f=!0;break}if(f===!1)return h(null),void 0;var d=new EasyStar.instance;d.openList=new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP),d.isDoneCalculating=!1,d.nodeHash={},d.startX=n,d.startY=s,d.endX=r,d.endY=a,d.callback=h,d.openList.insert(p(d,d.startX,d.startY,null,e)),c.push(d)},this.calculate=function(){if(0!==c.length&&void 0!==t&&void 0!==i)for(n=0;l>n;n++){if(0===c.length)return;if(o&&(n=0),0!==c[0].openList.length){var r=c[0].openList.shiftHighestPriorityElement(),a=[];r.list=EasyStar.Node.CLOSED_LIST,r.y>0&&a.push({instance:c[0],searchNode:r,x:0,y:-1,cost:e*v(r.x,r.y-1)}),r.x<t[0].length-1&&a.push({instance:c[0],searchNode:r,x:1,y:0,cost:e*v(r.x+1,r.y)}),r.y<t.length-1&&a.push({instance:c[0],searchNode:r,x:0,y:1,cost:e*v(r.x,r.y+1)}),r.x>0&&a.push({instance:c[0],searchNode:r,x:-1,y:0,cost:e*v(r.x-1,r.y)}),f&&(r.x>0&&r.y>0&&(h||d(t,i,r.x,r.y-1)&&d(t,i,r.x-1,r.y))&&a.push({instance:c[0],searchNode:r,x:-1,y:-1,cost:s*v(r.x-1,r.y-1)}),r.x<t[0].length-1&&r.y<t.length-1&&(h||d(t,i,r.x,r.y+1)&&d(t,i,r.x+1,r.y))&&a.push({instance:c[0],searchNode:r,x:1,y:1,cost:s*v(r.x+1,r.y+1)}),r.x<t[0].length-1&&r.y>0&&(h||d(t,i,r.x,r.y-1)&&d(t,i,r.x+1,r.y))&&a.push({instance:c[0],searchNode:r,x:1,y:-1,cost:s*v(r.x+1,r.y-1)}),r.x>0&&r.y<t.length-1&&(h||d(t,i,r.x,r.y+1)&&d(t,i,r.x-1,r.y))&&a.push({instance:c[0],searchNode:r,x:-1,y:1,cost:s*v(r.x-1,r.y+1)})),a.sort(function(t,n){return t.cost<n.cost?-1:t.cost===n.cost?0:1});for(var u=!1,p=0;p<a.length;p++)if(y(a[p].instance,a[p].searchNode,a[p].x,a[p].y,a[p].cost),a[p].instance.isDoneCalculating===!0){u=!0;break}u&&c.shift()}else{var g=c[0];g.callback(null),c.shift()}}};var y=function(n,e,s,o,a){var u=e.x+s,h=e.y+o;if(void 0===r[u+"_"+h]){if(n.endX===u&&n.endY===h){n.isDoneCalculating=!0;var c=[],l=0;c[l]={x:u,y:h},l++,c[l]={x:e.x,y:e.y},l++;for(var f=e.parent;null!=f;)c[l]={x:f.x,y:f.y},l++,f=f.parent;c.reverse();var y=n,v=c;y.callback(v)}if(d(t,i,u,h)){var g=p(n,u,h,e,a);void 0===g.list?(g.list=EasyStar.Node.OPEN_LIST,n.openList.insert(g)):g.list===EasyStar.Node.OPEN_LIST&&e.costSoFar+a<g.costSoFar&&(g.costSoFar=e.costSoFar+a,g.parent=e)}}},d=function(t,n,i,e){for(var s=0;s<n.length;s++)if(t[e][i]===n[s])return!0;return!1},v=function(n,i){return u[n+"_"+i]||a[t[i][n]]},p=function(t,n,i,e,s){if(void 0!==t.nodeHash[n+"_"+i])return t.nodeHash[n+"_"+i];var o=g(n,i,t.endX,t.endY);if(null!==e)var r=e.costSoFar+s;else r=o;var a=new EasyStar.Node(e,n,i,r,o);return t.nodeHash[n+"_"+i]=a,a},g=function(t,n,i,e){return Math.sqrt((i-=t)*i+(e-=n)*e)}};
var easystar = new EasyStar.js();

var world = {
        width: 48,  // map width
        height: 48, //map height
    };

var level = [

        [ 13.5, 2, 1, 4 ],
        [ 13.5, 12, 1, 2 ],
        [ 12.5, 13.5, 3, 1 ],
        [ 2, 13.5, 4, 1 ],
        [ 11.5, 15, 1, 2 ],
        [ 11.5, 23.5, 1, 5 ],

        [ 10, 26.5, 4, 1 ],
        [ 6, 26.5, 4, 1 ],

        [ 2, 34.5, 4, 1 ],
        [ 12.5, 34.5, 3, 1 ],
        [ 13.5, 36, 1, 2 ],
        [ 15, 36.5, 2, 1 ],
        [ 13.5, 46, 1, 4 ],

        [ 23.5, 36.5, 5, 1 ],
        [ 26.5, 38, 1, 4 ],
        [ 26.5, 42, 1, 4 ],

        [ 34.5, 46, 1, 4 ],
        [ 34.5, 36, 1, 2 ],
        [ 35.5, 34.5, 3, 1 ],
        [ 36.5, 33, 1, 2 ],
        [ 46, 34.5, 4, 1 ],

        [ 36.5, 24.5, 1, 5 ],
        [ 38, 21.5, 4, 1 ],
        [ 42, 21.5, 4, 1 ],

        [ 46, 13.5, 4, 1 ],
        [ 35.5, 13.5, 3, 1 ],
        [ 34.5, 12, 1, 2 ],
        [ 33, 11.5, 2, 1 ],
        [ 34.5, 2, 1, 4 ],

        [ 24.5, 11.5, 5, 1 ],
        [ 21.5, 10, 1, 4 ],
        [ 21.5, 6, 1, 4 ],

        // center
        [ 18.5, 22, 1, 6 ],
        [ 19, 18.5, 2, 1 ],
        [ 26, 18.5, 6, 1 ],
        [ 29.5, 19, 1, 2 ],
        [ 29.5, 26, 1, 6 ],
        [ 29, 29.5, 2, 1 ],
        [ 22, 29.5, 6, 1 ],
        [ 18.5, 29, 1, 2 ]
    ];

var generatePathingMap=function(){

    var pathingMap=[]
    for(var i=0; i<world.height; i++){
        var row=[];
        for (j=0; j<world.width; j++){
            row.push(0);
        }
        pathingMap.push(row)
    }
        var parse= function(arr, str){
        if(str="tall"){
            for(var i=arr[1]-(arr[3]/2); i<arr[1]-(arr[3]/2)+arr[3];i++){
                pathingMap[i][Math.floor(arr[0])]=1;
            }
        }
        if(str="wide"){
            for(var i=arr[0]-(arr[2]/2); i<arr[0]-(arr[2]/2)+arr[2];i++){
                pathingMap[Math.floor(arr[1])][i]=1;
            }
        }
    }
    for (var i=0; i<level.length; i++){
        if(level[i][3]>1){
            parse(level[i], "tall")
        }else{
            parse(level[i], "wide")
        }
    }
    return pathingMap;
}
var myPath=[];
var l=0;
pc.script.create('TankAI', function (context) {
    // Creates a new TankAI instance
    var TankAI = function (entity) {
        this.entity = entity;
        this.moved=0;
        this.movement = [ 0, 0 ];
        this.pastLocations=[];
        this.myPath=[];
        this.destination=false;
        this.destinationX=0;
        this.destinationY=0;

    };
    var layingMines=false;
    TankAI.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.pathingMap=generatePathingMap()
            this.angle = 0;
            this.previousTime=Date.now()
        },

        // Called every frame, dt is time in seconds since last update
        takeAction: function (tankPosition) {
            // console.log(destinationX);
            this.destinationY=destinationY;
            this.destinationX=destinationX;
            this.destination=destination;
            var _self = this.entity.script.client;
            easystar.setGrid(this.pathingMap);
            easystar.setAcceptableTiles([0]);
            easystar.enableDiagonals();
            

            this.tankPosition = tankPosition;
            //determines mine laying:
            if(this.tankPosition[0]>18 && this.tankPosition[0]<28 && this.tankPosition[2]>18 && this.tankPosition[2]<28){
                _self.socket.send('layMine', true);
                layingMines=true;
            }else if( layingMines===true){
                _self.socket.send('layMine', false);
                layingMines=false;
            }


            if(newPath===true){
                newPath=false;
                easystar.findPath(Math.round(this.tankPosition[0]), Math.round(this.tankPosition[2]),this.destinationX, this.destinationY, function( path ) { //destinationX, destinationY
                    if (path === null) {  //
                        console.log("Path was not found.");
                    } else {
                        myPath=path;
                        
                    }
                });
                easystar.calculate();
                this.destination=true;
            }
                
            
            
            //checks whether tank is stuck or stopped and changes directions if so:
            this.pastLocations.push(this.tankPosition[0])
            this.pastLocations.push(this.tankPosition[2])
            if(this.pastLocations.length>40){
                this.pastLocations.shift()
                this.pastLocations.shift()
            }
            if(this.unstick>0){
                this.unstick--
            }else{
                if(Math.abs(this.pastLocations[0]-this.pastLocations[38])+Math.abs(this.pastLocations[1]-this.pastLocations[39])<0.5){
                    this.movementOne=Math.round(Math.random()*2-1)
                    this.movementTwo=Math.round(Math.random()*2-1)
                    this.unstick=100;
                }else{
                    //Pathing:
                    if (l>myPath.length-2){
                       this.destination=false;
                       l=0;
                       currentPriority=0;
                    }
                    if(this.destination===true&&myPath.length>0){
        
                        if (Math.abs(this.tankPosition[0]-(myPath[l].x))+Math.abs(this.tankPosition[2]-(myPath[l].y))<1){ 

                            l++; 
                        }
                        if (this.tankPosition[0]<myPath[l].x&&this.tankPosition[2]>myPath[l].y){

                           this.movementOne=1
                            this.movementTwo=(((Math.abs(this.tankPosition[2]-myPath[l].y)/(Math.abs(this.tankPosition[0]-myPath[l].x)+Math.abs(this.tankPosition[2]-myPath[l].y)))*-2)+1)
        
                        }
                        if (this.tankPosition[0]>myPath[l].x&&this.tankPosition[2]<myPath[l].y){
                            this.movementOne=-1
                            this.movementTwo=(((Math.abs(this.tankPosition[2]-myPath[l].y)/(Math.abs(this.tankPosition[0]-myPath[l].x)+Math.abs(this.tankPosition[2]-myPath[l].y)))*2)-1)
                        }
                        if(this.tankPosition[0]>myPath[l].x&&this.tankPosition[2]>myPath[l].y){
                           this.movementTwo=-1
                           this.movementOne=(((Math.abs(this.tankPosition[0]-myPath[l].x)/(Math.abs(this.tankPosition[0]-myPath[l].x)+Math.abs(this.tankPosition[2]-myPath[l].y)))*-2)+1)
        
                        }
                        if(this.tankPosition[0]<myPath[l].x&&this.tankPosition[2]<myPath[l].y){
                           this.movementTwo=1
                           this.movementOne=(((Math.abs(this.tankPosition[0]-myPath[l].x)/(Math.abs(this.tankPosition[0]-myPath[l].x)+Math.abs(this.tankPosition[2]-myPath[l].y)))*2)-1)
                        }
                    }else{
                    
                        if (! this.connected)
                            return;
                        //ian edit: Motion script
            
                        if(shootNow===true){
                        }else{
                         this.shoot(false);   
                        }
                        if (this.moved===undefined){
                            this.moved=0;
                        }
                        if(this.braked===true){
                            this.moved=200;
                        }
                    }
                    if(this.moved%200===0||this.moved===0){
                    this.movementOne=Math.round(Math.random()*2-1)
                    this.movementTwo=Math.round(Math.random()*2-1)
                    while(this.movementOne===0 && this.movementTwo===0){
                        this.movementOne=Math.round(Math.random()*2-1)
                        this.movementTwo=Math.round(Math.random()*2-1)
                        }
                    }
                }
            }  
            
            //turns turret based on where enemies are detected.
            if(shootNow==="right"){
                if(this.angle>-180){
                    this.angle-=3
                }else{
                    this.angle=180;
                } 
            }else if(shootNow==="left"){
                if (this.angle<180){
                    this.angle+=3
                }else{
                    this.angle=-180;
                }
            }        
                

            this.entity.script.tanks.own.targeting(this.angle);
            // game server angle data is reversed, this takes that into account:
            if(this.angle<=0){
                var neg=(this.angle+180)
            }else{
                var neg=(this.angle-180)
            }
            
            _self.socket.send('target', neg);
            if(shootNow==true||shootNow==false){
                _self.socket.send('shoot', shootNow);
            }   
            movement=[this.movementOne,this.movementTwo];
            
            this.moved++;

            // rotate vector
            var t =       movement[0] * Math.sin(Math.PI * 0.75) - movement[1] * Math.cos(Math.PI * 0.75);
            movement[1] = movement[1] * Math.sin(Math.PI * 0.75) + movement[0] * Math.cos(Math.PI * 0.75);
            movement[0] = t;
            
            // check if it is changed
            if (movement[0] !== this.movement[0] || movement[1] != this.movement[1]) {
                this.movement = movement;
                _self.socket.send('move', this.movement);
            }

        }
    };

    return TankAI;
});