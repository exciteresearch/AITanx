pc.script.create('infoBox', function (context) {
    var InfoBox = function (entity) {
        this.entity = entity;
        
        var css = function() {/*
            #infoButton {
               position: absolute;
               width: 32px;
               height: 32px;
               line-height: 32px;
               top: 16px;
               right: 56px;
               z-index: 1;
               cursor: pointer;
               color: #eee;
               text-align: center;
               background-color: rgba(33, 34, 36, 0);
            }
            #modal{
                backgrou
            }
            @media all and (max-width: 640px) {
                #infoButton {
                    top: 8px;
                    right: 48px;
                }
            }
        */};
        css = css.toString().trim();
        css = css.slice(css.indexOf('/*') + 2).slice(0, -3);
        var style = document.createElement('style');
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);

        var button = this.button = document.createElement('div');
        button.id = 'infoButton';
        button.textContent = '?';
        document.body.appendChild(button);
        
        var modal = this.modal = document.createElement('div');
        modal.id = 'modal';
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.right = '0';
        modal.style.bottom = '0';
        modal.style.width = 'auto';
        modal.style.height = 'auto';
        modal.style.padding = '0 16px 4px 16px';
        modal.style.backgroundColor = 'rgba(33, 34, 36, 0)';
        // modal.style.color = '#2ecc71';
        modal.style.display = 'none';
        modal.style.zIndex = 20;
        modal.style.cursor = 'pointer';
        modal.style.textAlign = 'center';
        
        modal.innerHTML = '<img src="/images/ai-tanx-logo-green.png" style="padding-top:8px; width: 300px;" />';
        modal.innerHTML += '<p>Program Your Tank AI and Battle it Out!<p>';
        modal.innerHTML += '<br /><p>AI Tanx has been built by <a href="https://www.linkedin.com/in/djnadgar" target="_blank"> DJ Nadgar</a>, <a href="https://www.linkedin.com/in/miguelalvarezd" target="_blank"> Miguel Alvarez</a>, and <a href="https://www.linkedin.com/pub/ian-downie/79/9bb/824" target="_blank">Ian Downie</a> at <a href="http://www.fullstackacademy.com/" target="_blank">Fullstack Academy</a>.</p>';
        modal.innerHTML += '<p>Visit the Tutorial Page to Lean How to Code an AI tank!</p>';
        modal.innerHTML += '<p>The game features use of Angular, Javascript, SCSS, HTML5, WebGL, WebSockets, <a href="https://playcanvas.com/" target="_blank">PlayCanvas</a>, JQuery, AceEditor, EasyStar, Mongoose, and Node.</p>';
        modal.innerHTML += '<p>Game Foundation by: <a href="https://twitter.com/mrmaxm" target="_blank">moka</a>, SashaRX, <a href="https://twitter.com/4Roonio" target="_blank">Roonio</a>, and <a href="mailto:toxin136+tanx@gmail.com" target="_blank">ToXa</a>. </p>';
        
        document.body.appendChild(modal);
        
        document.body.style.fontWeight = '100';
        
        var logo = document.createElement('img');
        logo.id = 'logo';
        logo.src = '/images/ai-tanx-logo-black.png';
        logo.alt = 'logo';
        document.body.appendChild(logo);
        
        modal.addEventListener('click', function() {
            this.modal.style.display = 'none';
        }.bind(this), false);
        
        modal.addEventListener('touchstart', function() {
            this.modal.style.display = 'none';
        }.bind(this), false);
        

        button.addEventListener('click', function() {
            this.modal.style.display = 'block';
        }.bind(this), false);
        
        button.addEventListener('touchstart', function() {
            this.modal.style.display = 'block';
        }.bind(this), false);
    };
    
    InfoBox.prototype.setSize = function(size) {
        this.button.style.borderRightWidth = size + 'px';
        this.button.style.borderBottomWidth = size + 'px';
        
        this.button.childNodes[0].style.top = (size * .33) + 'px';
        this.button.childNodes[0].style.right = -Math.floor(size * .66) + 'px';
        this.button.childNodes[0].style.fontSize = Math.floor(size / 3) + 'px';
    };

    return InfoBox;
});