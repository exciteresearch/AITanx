pc.script.create('overlay', function (app) {
    var Overlay = function (entity) {
        this.entity = entity;
        var self = this;
    
        var css = [
            // cinematic
            ".cinematic-top,",
            ".cinematic-bottom {",
            // "   display: none;",
            "   position: absolute;",
            "   left: 0;",
            "   right: 0;",
            "   width: auto;",
            "   height: 0%;",
            "   visibility: hidden;",
            "   background-color: #000;",
            "   z-index: 2;",
            "   transition: visibility 200ms, height 200ms;",
            "   cursor: default;",
            "}",
            ".cinematic-top.active,",
            ".cinematic-bottom.active {",
            "   height: 15%;",
            "   visibility: visible;",
            "}",
            ".cinematic-top {",
            "   top: 0;",
            "}",
            ".cinematic-bottom {",
            "   bottom: 0;",
            "}",
            "#powered {",
            "   position: absolute;",
            "   bottom: 16px;",
            "   left: 16px;",
            "   z-index: 4;",
            "}",
            "#powered > img {",
            "   width: 100px;",
            "}",
            // overlay
            "#overlay {",
            "   position: absolute;",
            "   top: 0;",
            "   right: 0;",
            "   left: 0;",
            "   bottom: 0;",
            "   width: auto;",
            "   height: auto;",
            "   opacity: 0;",
            "   z-index: 3;",
            "   visibility: hidden;",
            "   background-color: rgba(0, 0, 0, .7);",
            "   transition: opacity 200ms, visibility 200ms, background-color 200ms;",
            "   cursor: default;",
            "}",
            "#overlay.active {",
            "   opacity: 1;",
            "   visibility: visible;",
            "}",
            // logo
            "#overlay > .logo {",
            "   position: absolute;",
            "   top: calc(50% - 76px);",
            "   left: calc(50% - 246px);",
            "   opacity: 0;",
            "   visibility: hidden;",
            "   transition: opacity 200ms, visibility 200ms;",
            "}",
            "#overlay > .logo.active {",
            "   opacity: 1;",
            "   visibility: visible;",
            "}",
            // winner
            "#overlay > .winner {",
            "   position: absolute;",
            "   top: calc(50% - 116px);",
            "   left: 0;",
            "   right: 0;",
            "   width: auto;",
            "   height: 232px;",
            "   color: #fff;",
            "   opacity: 0;",
            "   visibility: hidden;",
            "   transition: opacity 200ms, visibility 200ms;",
            "}",
            "#overlay > .winner.active {",
            "   opacity: 1;",
            "   visibility: visible;",
            "}",
            "#overlay > .winner > .icon {",
            "   width: 128px;",
            "   height: 128px;",
            "   margin: 0 auto 8px;",
            "   background-size: contain;",
            "   background-position: center center;",
            "   background-repeat: no-repeat;",
            "}",
            "#overlay > .winner > .text {",
            "   text-align: center;",
            "   font-size: 18px;",
            "   line-height: 20px;",
            "   color: #c4d9e6;",
            "}",
            "#overlay > .winner > .team {",
            "   text-align: center;",
            "   font-size: 64px;",
            "   line-height: 72px;",
            "}",
            // killer
            "#overlay > .killer {",
            "   position: absolute;",
            "   top: calc(50% - 116px);",
            "   left: calc(50% - 160px);",
            "   width: 320px;",
            "   height: 232px;",
            "   color: #fff;",
            "   opacity: 0;",
            "   visibility: hidden;",
            "   transition: opacity 200ms, visibility 200ms;",
            "}",
            "#overlay > .killer.active {",
            "   opacity: 1;",
            "   visibility: visible;",
            "}",
            "#overlay > .killer > .icon {",
            "   width: 112px;",
            "   height: 128px;",
            "   margin: 0 auto 8px;",
            "   background-size: contain;",
            "   background-position: center center;",
            "   background-repeat: no-repeat;",
            "}",
            "#overlay > .killer > .by {",
            "   text-align: center;",
            "   font-size: 18px;",
            "   line-height: 20px;",
            "   color: #c4d9e6;",
            "}",
            "#overlay > .killer > .name {",
            "   text-align: center;",
            "   font-size: 42px;",
            "   line-height: 72px;",
            "}",
            "#overlay > #timer {",
            "   position: absolute;",
            "   left: calc(50% - 32px);",
            "   bottom: 15%;",
            "   color: #c4d9e6;",
            "   width: 64px;",
            "   text-align: center;",
            "   font-size: 24px;",
            "   line-height: 30px;",
            "   margin-bottom: 8px;",
            "   opacity: 0;",
            "   visibility: hidden;",
            "   transition: opacity 200ms, visibility 200ms;",
            "}",
            "#overlay > #timer.active {",
            "   opacity: 1;",
            "   visibility: visible;",
            "}",
            "#usernamePopup {",
            "   width: 256px;",
            "   height: 58px;",
            "   background-color: #212224;",
            "   position: absolute;",
            "   top: calc(50% - 61px);",
            "   left: calc(50% - 160px);",
            "   color: #fff;",
            "   text-align: center;",
            "   cursor: default;",
            "   padding: 32px;",
            "   z-index: 3;",
            "   opacity: 0;",
            "   visibility: hidden;",
            "   transition: opacity 200ms, visibility 200ms;",
            "}",
            "#usernamePopup.active {",
            "   opacity: 1;",
            "   visibility: visible;",
            "}",
            "#usernamePopup > input {",
            "   display: none;",
            "   margin: 0;",
            "   outline: 0;",
            "   width: calc(100% - 16px - 2px);",
            "   line-height: 32px;",
            "   padding: 0 8px;",
            "   font-size: 18px;",
            "   font-family: furore;",
            "   background-color: #000;",
            "   color: #fff;",
            "   border: 1px solid #333;",
            "   text-align: center;",
            "}",
            "#usernamePopup.active > input {",
            "   display: block;",
            "}",
            "#usernamePopup > #usernameCancel {",
            "   float: left;",
            "   margin: 8px 0 0 1px;",
            "}",
            "#usernamePopup > #usernameOk {",
            "   float: right;",
            "   margin: 8px 1px 0 0;",
            "}",
            "@media all and (max-width: 640px) {",
            "   .cinematic-top,",
            "   .cinematic-bottom {",
            "       display: none;",
            "   }",
            "   #powered {",
            "       top: auto;",
            "       bottom: 8px;",
            "       left: 8px;",
            "   }",
            "   #powered.initial {",
            "       bottom: calc(50% + 38px + 4px);",
            "       left: calc(50% - 122px);",
            "   }",
            "   #powered > img {",
            "       width: 100px;",
            "   }",
            "   #overlay > .logo {",
            "       width: 246px;",
            "       left: calc(50% - 123px);",
            "       top: calc(50% - 38px);",
            "   }",
            "   #overlay > .winner {",
            "       top: calc(50% - 83px);",
            "       height: 166px;",
            "   }",
            "   #overlay > .winner > .icon {",
            "       width: 72px;",
            "       height: 88px;",
            "       margin-bottom: 0;",
            "   }",
            "   #overlay > .winner > .text {",
            "       font-size: 14px;",
            "       line-height: 16px;",
            "   }",
            "   #overlay > .winner > .team {",
            "      font-size: 48px;",
            "      line-height: 54px;",
            "   }",
            "   #overlay > .killer {",
            "       top: calc(50% - 83px);",
            "       height: 166px;",
            "   }",
            "   #overlay > .killer > .icon {",
            "       width: 72px;",
            "       height: 88px;",
            "       margin-bottom: 0;",
            "   }",
            "   #overlay > .killer > .by {",
            "       font-size: 14px;",
            "       line-height: 16px;",
            "   }",
            "   #overlay > .killer > .name {",
            "      font-size: 48px;",
            "      line-height: 54px;",
            "   }",
            "   #overlay > #timer {",
            "       bottom: 0;",
            "   }",
            "}",
        ].join('\n');
        
        var style = document.createElement('style');
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
        
        // overlay
        var overlay = this.elOverlay = document.createElement('div');
        overlay.classList.add('active');
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
        
        // logo
        var logo = this.elLogo = new Image();
        logo.classList.add('logo', 'active');
        logo.src = '/images/ai-tanx-logo-green.png';
        overlay.appendChild(logo);

        // cinematic top
        var cinematicTop = this.elCinematicTop = document.createElement('div');
        cinematicTop.classList.add('cinematic-top', 'active');
        document.body.appendChild(cinematicTop);
        
        this.elLogoSmall = document.getElementById('logo');
        
        // powered by
        var powered = this.elPowered = document.createElement('a');
        powered.id = 'powered';
        powered.target = '_blank';
        powered.href = 'https://playcanvas.com/';
        powered.classList.add('powered', 'initial');
        powered.addEventListener('touchstart', function() {
            window.open(this.href);
        }, false);
        overlay.appendChild(powered);
        
        // powered by img
        var img = new Image();
        img.src = 'https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/tanx/powered.png';
        powered.appendChild(img);

        // cinematic bottom
        var cinematicBottom = this.elCinematicBottom = document.createElement('div');
        cinematicBottom.classList.add('cinematic-bottom', 'active');
        document.body.appendChild(cinematicBottom);
        
        // winner
        var winner = this.elWinner = document.createElement('div');
        winner.classList.add('winner');
        overlay.appendChild(winner);
        
        // winner icon
        var winnerIcon = this.elWinnerIcon = document.createElement('div');
        winnerIcon.classList.add('icon');
        winner.appendChild(winnerIcon);
        
        // winner message
        var winnerText = document.createElement('div');
        winnerText.classList.add('text');
        winnerText.textContent = 'winner';
        winner.appendChild(winnerText);
        
        // winner team
        var winnerTeam = this.elWinnerTeam = document.createElement('div');
        winnerTeam.classList.add('team');
        winnerTeam.textContent = '';
        winner.appendChild(winnerTeam);

        // killer
        var killer = this.elKiller = document.createElement('div');
        killer.classList.add('killer');
        overlay.appendChild(killer);
        
        // killer icon
        var killerIcon = this.elKillerIcon = document.createElement('div');
        killerIcon.classList.add('icon');
        killer.appendChild(killerIcon);
        
        // killer name
        var killerBy = document.createElement('div');
        killerBy.classList.add('by');
        killerBy.textContent = 'killed by';
        killer.appendChild(killerBy);
        
        // killer name
        var killerName = this.elKillerName = document.createElement('div');
        killerName.classList.add('name');
        killer.appendChild(killerName);
        
        // killer timer
        var timer = this.elTimer = document.createElement('div');
        timer.id = 'timer';
        overlay.appendChild(timer);
        
        //ian edit adding scripts:
       var userscript = this.elUserscript = document.createElement('div');
        userscript.id = 'userscriptPopup';
        userscript.innerHTML = "<input id='userscriptInput' type='text' value='guest'><div id='userscriptCancel'>Cancel</div><div id='userscriptOk'>OK</div>";
        document.body.appendChild(userscript);
        
        // username
        var username = this.elUsername = document.createElement('div');
        username.id = 'usernamePopup';
        username.innerHTML = "<input id='usernameInput' type='text' value='guest'><div id='usernameCancel'>Cancel</div><div id='usernameOk'>OK</div>";
        document.body.appendChild(username);
        
        this.elUsernameInput = document.getElementById('usernameInput');
        this.elUsernameInput.addEventListener('keydown', function(evt) {
            if (evt.keyCode === 13)
                document.getElementById('usernameOk').click();
                
            if (evt.keyCode === 27)
                document.getElementById('usernameCancel').click();
        }, false);
        
        document.getElementById('usernameOk').addEventListener('click', function() {
            self.username(true);
            self.elUsernameInput.blur();
        });
        document.getElementById('usernameOk').addEventListener('touchstart', function() {
            self.username(true);
            self.elUsernameInput.blur();
        });
        document.getElementById('usernameCancel').addEventListener('click', function() {
            self.username(false);
            self.elUsernameInput.blur();
        });
        document.getElementById('usernameCancel').addEventListener('touchstart', function() {
            self.username(false);
            self.elUsernameInput.blur();
        });
        
        this.usernameFn = null;

        this.timerStart = 0;
        this.timerElapse = 1;
        this.timerSecond = 0;
        
        this.imagesStore = 'https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/tanx/';
        
        this.volume = .5;
        this.volumeTarget = .5;
        
        var self = this;
        setTimeout(function() {
            var audio = self.audio = new Audio('https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/tanx/music.mp3');
            audio.autoplay = true;
            audio.controls = false;
            audio.loop = true;
            audio.volume = self.volume;
            audio.play();
            
            var evtPlay = function() {
                audio.play();
                window.removeEventListener('touchstart', evtPlay);
            };
            window.addEventListener('touchstart', evtPlay, false);
        }, 500);
    };

    Overlay.prototype = {
        initialize: function () {
            this.touch = app.root.getChildren()[0].script.touch;
            this.minimap = app.root.getChildren()[0].script.minimap;
            
            this.overlay(.2);
            this.cinematic(true);
            this.timer(5);
        },
        
        update: function() {
            if (this.timerStart) {
                var s = this.timerElapse - Math.round((Date.now() - this.timerStart) / 1000);
                if (s >= 0) {
                    if (this.timerSecond !== s) {
                        this.timerSecond = s;
                        this.elTimer.textContent = s;
                    }
                } else {
                    this.timerStart = 0;
                    this.elTimer.classList.remove('active');
                }
            }
            
            if (this.audio && this.volume !== this.volumeTarget) {
                this.volume += (this.volumeTarget - this.volume) * .1;
                
                if (Math.abs(this.volume - this.volumeTarget) < 0.01)
                    this.volume = this.volumeTarget;
                    
                this.audio.volume = this.volume;
            }
        },

        overlay: function(state) {
            if (state) {
                this.volumeTarget = .5;
                this.elOverlay.style.backgroundColor = 'rgba(0, 0, 0, ' + (isNaN(state) ? .7 : state) + ')'
                this.elOverlay.classList.add('active');
                this.elLogoSmall.style.display = 'none';
                this.touch.hidden(true);
                this.minimap.state(false);
            } else {
                this.volumeTarget = .2;
                this.elLogoSmall.style.display = '';
                this.elOverlay.style.backgroundColor = '';
                this.elOverlay.classList.remove('active');
                this.elLogo.classList.remove('active');
                this.elPowered.classList.remove('initial');
                this.touch.hidden(false);
                this.minimap.state(true);
                this.timer(false);
            }
        },
        
        cinematic: function(state) {
            if (state) {
                this.elCinematicTop.classList.add('active');
                this.elCinematicBottom.classList.add('active');
            } else {
                this.elCinematicTop.classList.remove('active');
                this.elCinematicBottom.classList.remove('active');
            }
        },
        
        username: function(text, fn) {
            if (text === true) {
                this.elUsername.classList.remove('active');
                if (this.usernameFn)
                    this.usernameFn(this.elUsernameInput.value);
                    
            } else if (text) {
                this.usernameFn = fn;
                this.elUsername.classList.add('active');
                this.elUsernameInput.value = text;
                
                var self = this;
                setTimeout(function() {
                    self.elUsernameInput.focus();
                    self.elUsernameInput.select();
                }, 200);
            } else {
                this.elUsername.classList.remove('active');
                
                if (this.usernameFn)
                    this.usernameFn();
            }
        },
        
        winner: function(team) {
            if (! team) {
                this.elWinner.classList.remove('active');
            } else {
                this.killer(false);
                this.elWinnerTeam.textContent = team;
                this.elWinnerIcon.style.backgroundImage = 'url("' + this.imagesStore + 'winner-' + team + '.png")';
                this.elWinner.classList.add('active');
            }
        },
        
        timer: function(elapse) {
            if (elapse) {
                this.timerStart = Date.now();
                this.timerElapse = elapse;
                this.timerSecond = -1;
                this.elTimer.classList.add('active');
            } else {
                this.timerStart = 0;
                this.elTimer.classList.remove('active');
            }
        },
        
        killer: function(name, color) {
            if (! name || this.elWinner.classList.contains('active')) {
                this.timerStart = null;
                this.elKiller.classList.remove('active');
            } else {
                this.timerStart = Date.now();
                this.elKillerIcon.style.backgroundImage = 'url("' + this.imagesStore + 'killer-' + color + '.png")';
                this.elKillerName.textContent = name;
                this.elKiller.classList.add('active');
            }
        },
        

    };

    return Overlay;
});