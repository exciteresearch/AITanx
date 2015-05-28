pc.script.create('FSBpanzer', function (app) {
    // Creates a new FSBpanzer instance
    var FSBpanzer = function (entity) {
        this.entity = entity;

    };

    FSBpanzer.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.tickTime = Date.now();
            this.actions = {};
            this.lastPositionsOccupied = [];
            this.numberOfPositionsToRemember = 6;
        },

        // Called every frame, dt is time in seconds since last update
        takeAction: function(){
        	// botCode start
                this.goTowards( this.tankPosition, [24, 24] );
        	// botCode end
        },

        shoot: function() {
            //console.log("shoot");
            this.entity.script.client.shoot(true);
        },

        //get Health Status Bar
        getHP: function() {
            //TODO
        },

        moveToRegion: function( number ) {
            if (number === 1) this.goTowards( this.tankPosition, [8, 8] );
            else if (number === 2) this.goTowards( this.tankPosition, [24, 8] );
            else if (number === 3) this.goTowards( this.tankPosition, [40, 8] );
            else if (number === 4) this.goTowards( this.tankPosition, [8, 24] );
            else if (number === 6) this.goTowards( this.tankPosition, [40, 24] );
            else if (number === 7) this.goTowards( this.tankPosition, [8, 40] );
            else if (number === 8) this.goTowards( this.tankPosition, [24, 40] );
            else if (number === 9) this.goTowards( this.tankPosition, [40, 40] );
            else this.goTowards( this.tankPosition, [24, 24] );
        },

        distanceTo: function(tankPosition, goal) {
            
            var EasyStar=EasyStar||{};"function"==typeof define&&define.amd&&define("easystar",[],function(){return EasyStar}),"undefined"!=typeof module&&module.exports&&(module.exports=EasyStar),EasyStar.Node=function(t,n,i,e,s){this.parent=t,this.x=n,this.y=i,this.costSoFar=e,this.simpleDistanceToTarget=s,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}},EasyStar.Node.OPEN_LIST=0,EasyStar.Node.CLOSED_LIST=1,EasyStar.PriorityQueue=function(t,n){this.length=0;var i=[],e=!1;if(n==EasyStar.PriorityQueue.MAX_HEAP)e=!0;else{if(n!=EasyStar.PriorityQueue.MIN_HEAP)throw n+" not supported.";e=!1}this.insert=function(n){if(!n.hasOwnProperty(t))throw"Cannot insert "+n+" because it does not have a property by the name of "+t+".";i.push(n),this.length++,s(this.length-1)},this.getHighestPriorityElement=function(){return i[0]},this.shiftHighestPriorityElement=function(){if(0===this.length)throw"There are no more elements in your priority queue.";if(1===this.length){var t=i[0];return i=[],this.length=0,t}var n=i[0],e=i.pop();return this.length--,i[0]=e,o(0),n};var s=function(t){if(0!==t){var n=u(t);a(t,n)&&(r(t,n),s(n))}},o=function(t){var n=h(t),i=c(t);if(a(n,t))r(t,n),o(n);else if(a(i,t))r(t,i),o(i);else{if(0==t)return;o(0)}},r=function(t,n){var e=i[t];i[t]=i[n],i[n]=e},a=function(n,s){if(void 0===i[s]||void 0===i[n])return!1;var o,r;return"function"==typeof i[n][t]?(o=i[n][t](),r=i[s][t]()):(o=i[n][t],r=i[s][t]),e?o>r?!0:!1:r>o?!0:!1},u=function(t){return Math.floor(t/2)-1},h=function(t){return 2*t+1},c=function(t){return 2*t+2}},EasyStar.PriorityQueue.MAX_HEAP=0,EasyStar.PriorityQueue.MIN_HEAP=1,EasyStar.instance=function(){this.isDoneCalculating=!0,this.pointsToAvoid={},this.startX,this.callback,this.startY,this.endX,this.endY,this.nodeHash={},this.openList},EasyStar.js=function(){var t,n,i,e=10,s=14,o=!1,r={},a={},u={},h=!0,c=[],l=Number.MAX_VALUE,f=!1;this.setAcceptableTiles=function(t){t instanceof Array?i=t:!isNaN(parseFloat(t))&&isFinite(t)&&(i=[t])},this.enableSync=function(){o=!0},this.disableSync=function(){o=!1},this.enableDiagonals=function(){f=!0},this.disableDiagonals=function(){f=!1},this.setGrid=function(n){t=n;for(var i=0;i<t.length;i++)for(var e=0;e<t[0].length;e++)a[t[i][e]]||(a[t[i][e]]=1)},this.setTileCost=function(t,n){a[t]=n},this.setAdditionalPointCost=function(t,n,i){u[t+"_"+n]=i},this.removeAdditionalPointCost=function(t,n){delete u[t+"_"+n]},this.removeAllAdditionalPointCosts=function(){u={}},this.setIterationsPerCalculation=function(t){l=t},this.avoidAdditionalPoint=function(t,n){r[t+"_"+n]=1},this.stopAvoidingAdditionalPoint=function(t,n){delete r[t+"_"+n]},this.enableCornerCutting=function(){h=!0},this.disableCornerCutting=function(){h=!1},this.stopAvoidingAllAdditionalPoints=function(){r={}},this.findPath=function(n,s,r,a,u){var h=function(t){o?u(t):setTimeout(function(){u(t)})};if(void 0===i)throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");if(void 0===t)throw new Error("You can't set a path without first calling setGrid() on EasyStar.");if(0>n||0>s||0>r||0>r||n>t[0].length-1||s>t.length-1||r>t[0].length-1||a>t.length-1)throw new Error("Your start or end point is outside the scope of your grid.");if(n===r&&s===a)return h([]),void 0;for(var l=t[a][r],f=!1,y=0;y<i.length;y++)if(l===i[y]){f=!0;break}if(f===!1)return h(null),void 0;var d=new EasyStar.instance;d.openList=new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP),d.isDoneCalculating=!1,d.nodeHash={},d.startX=n,d.startY=s,d.endX=r,d.endY=a,d.callback=h,d.openList.insert(p(d,d.startX,d.startY,null,e)),c.push(d)},this.calculate=function(){if(0!==c.length&&void 0!==t&&void 0!==i)for(n=0;l>n;n++){if(0===c.length)return;if(o&&(n=0),0!==c[0].openList.length){var r=c[0].openList.shiftHighestPriorityElement(),a=[];r.list=EasyStar.Node.CLOSED_LIST,r.y>0&&a.push({instance:c[0],searchNode:r,x:0,y:-1,cost:e*v(r.x,r.y-1)}),r.x<t[0].length-1&&a.push({instance:c[0],searchNode:r,x:1,y:0,cost:e*v(r.x+1,r.y)}),r.y<t.length-1&&a.push({instance:c[0],searchNode:r,x:0,y:1,cost:e*v(r.x,r.y+1)}),r.x>0&&a.push({instance:c[0],searchNode:r,x:-1,y:0,cost:e*v(r.x-1,r.y)}),f&&(r.x>0&&r.y>0&&(h||d(t,i,r.x,r.y-1)&&d(t,i,r.x-1,r.y))&&a.push({instance:c[0],searchNode:r,x:-1,y:-1,cost:s*v(r.x-1,r.y-1)}),r.x<t[0].length-1&&r.y<t.length-1&&(h||d(t,i,r.x,r.y+1)&&d(t,i,r.x+1,r.y))&&a.push({instance:c[0],searchNode:r,x:1,y:1,cost:s*v(r.x+1,r.y+1)}),r.x<t[0].length-1&&r.y>0&&(h||d(t,i,r.x,r.y-1)&&d(t,i,r.x+1,r.y))&&a.push({instance:c[0],searchNode:r,x:1,y:-1,cost:s*v(r.x+1,r.y-1)}),r.x>0&&r.y<t.length-1&&(h||d(t,i,r.x,r.y+1)&&d(t,i,r.x-1,r.y))&&a.push({instance:c[0],searchNode:r,x:-1,y:1,cost:s*v(r.x-1,r.y+1)})),a.sort(function(t,n){return t.cost<n.cost?-1:t.cost===n.cost?0:1});for(var u=!1,p=0;p<a.length;p++)if(y(a[p].instance,a[p].searchNode,a[p].x,a[p].y,a[p].cost),a[p].instance.isDoneCalculating===!0){u=!0;break}u&&c.shift()}else{var g=c[0];g.callback(null),c.shift()}}};var y=function(n,e,s,o,a){var u=e.x+s,h=e.y+o;if(void 0===r[u+"_"+h]){if(n.endX===u&&n.endY===h){n.isDoneCalculating=!0;var c=[],l=0;c[l]={x:u,y:h},l++,c[l]={x:e.x,y:e.y},l++;for(var f=e.parent;null!=f;)c[l]={x:f.x,y:f.y},l++,f=f.parent;c.reverse();var y=n,v=c;y.callback(v)}if(d(t,i,u,h)){var g=p(n,u,h,e,a);void 0===g.list?(g.list=EasyStar.Node.OPEN_LIST,n.openList.insert(g)):g.list===EasyStar.Node.OPEN_LIST&&e.costSoFar+a<g.costSoFar&&(g.costSoFar=e.costSoFar+a,g.parent=e)}}},d=function(t,n,i,e){for(var s=0;s<n.length;s++)if(t[e][i]===n[s])return!0;return!1},v=function(n,i){return u[n+"_"+i]||a[t[i][n]]},p=function(t,n,i,e,s){if(void 0!==t.nodeHash[n+"_"+i])return t.nodeHash[n+"_"+i];var o=g(n,i,t.endX,t.endY);if(null!==e)var r=e.costSoFar+s;else r=o;var a=new EasyStar.Node(e,n,i,r,o);return t.nodeHash[n+"_"+i]=a,a},g=function(t,n,i,e){return Math.sqrt((i-=t)*i+(e-=n)*e)}};
var easystar = new EasyStar.js();

var twoDimensionalArray=worldMap=[
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

easystar.setGrid(twoDimensionalArray);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();
_self = this.entity.script.client;
easystar.findPath(Math.round(tankPosition[0]), Math.round(tankPosition[1]), destiny[0], destiny[1], 
    function( path ) { return path.length; }
});
easystar.calculate();
        }// end of Distance To,

        goTowards: function( tankPosition, destiny ) {

            function notMovementRecently(arr) {
                var positionsToCheck = 4;
                var l = arr.length;
                if (l<positionsToCheck) return false;// We check at least four positions to confirm our supposition
                var counter = 0;
                for (var i=l-positionsToCheck; i<l-1; i++) {
                    var euclid_dist = Math.sqrt(Math.pow(Math.abs(arr[i][0] - arr[i+1][0]),2) +
                       Math.pow(Math.abs(arr[i][1] - arr[i+1][1]), 2));
                    if ( euclid_dist < 1) counter++;
                }
                arr.shift();
                if ( counter === positionsToCheck-1 ) { console.log("Escape!"); return true; } 
                else return false;
            }
            //console.log("goTowards", tankPosition, destiny);
            this.lastPositionsOccupied.push(tankPosition);
            if (this.lastPositionsOccupied.length>10 && notMovementRecently( this.lastPositionsOccupied ) ) {
                var x = Math.round(Math.random()*2-1), z = Math.round(Math.random()*2-1);
                var t = x * Math.sin(Math.PI * 0.75) - z * Math.cos(Math.PI * 0.75);
                z = z * Math.sin(Math.PI * 0.75) + x * Math.cos(Math.PI * 0.75);
                x = t;
                _self.socket.send('move', [ x, z ]);
            }

var EasyStar=EasyStar||{};"function"==typeof define&&define.amd&&define("easystar",[],function(){return EasyStar}),"undefined"!=typeof module&&module.exports&&(module.exports=EasyStar),EasyStar.Node=function(t,n,i,e,s){this.parent=t,this.x=n,this.y=i,this.costSoFar=e,this.simpleDistanceToTarget=s,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}},EasyStar.Node.OPEN_LIST=0,EasyStar.Node.CLOSED_LIST=1,EasyStar.PriorityQueue=function(t,n){this.length=0;var i=[],e=!1;if(n==EasyStar.PriorityQueue.MAX_HEAP)e=!0;else{if(n!=EasyStar.PriorityQueue.MIN_HEAP)throw n+" not supported.";e=!1}this.insert=function(n){if(!n.hasOwnProperty(t))throw"Cannot insert "+n+" because it does not have a property by the name of "+t+".";i.push(n),this.length++,s(this.length-1)},this.getHighestPriorityElement=function(){return i[0]},this.shiftHighestPriorityElement=function(){if(0===this.length)throw"There are no more elements in your priority queue.";if(1===this.length){var t=i[0];return i=[],this.length=0,t}var n=i[0],e=i.pop();return this.length--,i[0]=e,o(0),n};var s=function(t){if(0!==t){var n=u(t);a(t,n)&&(r(t,n),s(n))}},o=function(t){var n=h(t),i=c(t);if(a(n,t))r(t,n),o(n);else if(a(i,t))r(t,i),o(i);else{if(0==t)return;o(0)}},r=function(t,n){var e=i[t];i[t]=i[n],i[n]=e},a=function(n,s){if(void 0===i[s]||void 0===i[n])return!1;var o,r;return"function"==typeof i[n][t]?(o=i[n][t](),r=i[s][t]()):(o=i[n][t],r=i[s][t]),e?o>r?!0:!1:r>o?!0:!1},u=function(t){return Math.floor(t/2)-1},h=function(t){return 2*t+1},c=function(t){return 2*t+2}},EasyStar.PriorityQueue.MAX_HEAP=0,EasyStar.PriorityQueue.MIN_HEAP=1,EasyStar.instance=function(){this.isDoneCalculating=!0,this.pointsToAvoid={},this.startX,this.callback,this.startY,this.endX,this.endY,this.nodeHash={},this.openList},EasyStar.js=function(){var t,n,i,e=10,s=14,o=!1,r={},a={},u={},h=!0,c=[],l=Number.MAX_VALUE,f=!1;this.setAcceptableTiles=function(t){t instanceof Array?i=t:!isNaN(parseFloat(t))&&isFinite(t)&&(i=[t])},this.enableSync=function(){o=!0},this.disableSync=function(){o=!1},this.enableDiagonals=function(){f=!0},this.disableDiagonals=function(){f=!1},this.setGrid=function(n){t=n;for(var i=0;i<t.length;i++)for(var e=0;e<t[0].length;e++)a[t[i][e]]||(a[t[i][e]]=1)},this.setTileCost=function(t,n){a[t]=n},this.setAdditionalPointCost=function(t,n,i){u[t+"_"+n]=i},this.removeAdditionalPointCost=function(t,n){delete u[t+"_"+n]},this.removeAllAdditionalPointCosts=function(){u={}},this.setIterationsPerCalculation=function(t){l=t},this.avoidAdditionalPoint=function(t,n){r[t+"_"+n]=1},this.stopAvoidingAdditionalPoint=function(t,n){delete r[t+"_"+n]},this.enableCornerCutting=function(){h=!0},this.disableCornerCutting=function(){h=!1},this.stopAvoidingAllAdditionalPoints=function(){r={}},this.findPath=function(n,s,r,a,u){var h=function(t){o?u(t):setTimeout(function(){u(t)})};if(void 0===i)throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");if(void 0===t)throw new Error("You can't set a path without first calling setGrid() on EasyStar.");if(0>n||0>s||0>r||0>r||n>t[0].length-1||s>t.length-1||r>t[0].length-1||a>t.length-1)throw new Error("Your start or end point is outside the scope of your grid.");if(n===r&&s===a)return h([]),void 0;for(var l=t[a][r],f=!1,y=0;y<i.length;y++)if(l===i[y]){f=!0;break}if(f===!1)return h(null),void 0;var d=new EasyStar.instance;d.openList=new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP),d.isDoneCalculating=!1,d.nodeHash={},d.startX=n,d.startY=s,d.endX=r,d.endY=a,d.callback=h,d.openList.insert(p(d,d.startX,d.startY,null,e)),c.push(d)},this.calculate=function(){if(0!==c.length&&void 0!==t&&void 0!==i)for(n=0;l>n;n++){if(0===c.length)return;if(o&&(n=0),0!==c[0].openList.length){var r=c[0].openList.shiftHighestPriorityElement(),a=[];r.list=EasyStar.Node.CLOSED_LIST,r.y>0&&a.push({instance:c[0],searchNode:r,x:0,y:-1,cost:e*v(r.x,r.y-1)}),r.x<t[0].length-1&&a.push({instance:c[0],searchNode:r,x:1,y:0,cost:e*v(r.x+1,r.y)}),r.y<t.length-1&&a.push({instance:c[0],searchNode:r,x:0,y:1,cost:e*v(r.x,r.y+1)}),r.x>0&&a.push({instance:c[0],searchNode:r,x:-1,y:0,cost:e*v(r.x-1,r.y)}),f&&(r.x>0&&r.y>0&&(h||d(t,i,r.x,r.y-1)&&d(t,i,r.x-1,r.y))&&a.push({instance:c[0],searchNode:r,x:-1,y:-1,cost:s*v(r.x-1,r.y-1)}),r.x<t[0].length-1&&r.y<t.length-1&&(h||d(t,i,r.x,r.y+1)&&d(t,i,r.x+1,r.y))&&a.push({instance:c[0],searchNode:r,x:1,y:1,cost:s*v(r.x+1,r.y+1)}),r.x<t[0].length-1&&r.y>0&&(h||d(t,i,r.x,r.y-1)&&d(t,i,r.x+1,r.y))&&a.push({instance:c[0],searchNode:r,x:1,y:-1,cost:s*v(r.x+1,r.y-1)}),r.x>0&&r.y<t.length-1&&(h||d(t,i,r.x,r.y+1)&&d(t,i,r.x-1,r.y))&&a.push({instance:c[0],searchNode:r,x:-1,y:1,cost:s*v(r.x-1,r.y+1)})),a.sort(function(t,n){return t.cost<n.cost?-1:t.cost===n.cost?0:1});for(var u=!1,p=0;p<a.length;p++)if(y(a[p].instance,a[p].searchNode,a[p].x,a[p].y,a[p].cost),a[p].instance.isDoneCalculating===!0){u=!0;break}u&&c.shift()}else{var g=c[0];g.callback(null),c.shift()}}};var y=function(n,e,s,o,a){var u=e.x+s,h=e.y+o;if(void 0===r[u+"_"+h]){if(n.endX===u&&n.endY===h){n.isDoneCalculating=!0;var c=[],l=0;c[l]={x:u,y:h},l++,c[l]={x:e.x,y:e.y},l++;for(var f=e.parent;null!=f;)c[l]={x:f.x,y:f.y},l++,f=f.parent;c.reverse();var y=n,v=c;y.callback(v)}if(d(t,i,u,h)){var g=p(n,u,h,e,a);void 0===g.list?(g.list=EasyStar.Node.OPEN_LIST,n.openList.insert(g)):g.list===EasyStar.Node.OPEN_LIST&&e.costSoFar+a<g.costSoFar&&(g.costSoFar=e.costSoFar+a,g.parent=e)}}},d=function(t,n,i,e){for(var s=0;s<n.length;s++)if(t[e][i]===n[s])return!0;return!1},v=function(n,i){return u[n+"_"+i]||a[t[i][n]]},p=function(t,n,i,e,s){if(void 0!==t.nodeHash[n+"_"+i])return t.nodeHash[n+"_"+i];var o=g(n,i,t.endX,t.endY);if(null!==e)var r=e.costSoFar+s;else r=o;var a=new EasyStar.Node(e,n,i,r,o);return t.nodeHash[n+"_"+i]=a,a},g=function(t,n,i,e){return Math.sqrt((i-=t)*i+(e-=n)*e)}};
var easystar = new EasyStar.js();

var twoDimensionalArray=worldMap=[
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

easystar.setGrid(twoDimensionalArray);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();
_self = this.entity.script.client;
easystar.findPath(Math.round(tankPosition[0]), Math.round(tankPosition[1]), destiny[0], destiny[1], 
    function( path ) {
    if (!path[0]) {
        console.log("Path was not found.");
         var x = Math.round(Math.random()*2-1), z = Math.round(Math.random()*2-1);
        _self.socket.send('move', [ x, z ]);
    } else {
        
          var xValue = path[0].x-tankPosition[0]; 
          var zValue = path[0].y-tankPosition[1];

        if (path.length>1) 
            { var xValue = path[1].x-tankPosition[0];
            var zValue = path[1].y-tankPosition[1]; }

        var norm = Math.max(Math.abs(xValue), Math.abs(zValue));
        xValue = xValue/norm; zValue = zValue/norm;

        if ( (Math.abs(destiny[0]-tankPosition[0])<0.5) && (Math.abs(destiny[1]-tankPosition[1])<0.5)) {
           var t = xValue * Math.sin(Math.PI * 0.75) - zValue * Math.cos(Math.PI * 0.75);
            zValue = zValue * Math.sin(Math.PI * 0.75) + xValue * Math.cos(Math.PI * 0.75);
            xValue = t; console.log("quiet!");
        }
        else  _self.socket.send('move', [xValue, zValue]);

    }
});
easystar.calculate();

        }//goTowards
    };//prototype

    return FSBpanzer;
});