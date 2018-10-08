(function() {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    var red = document.getElementById('red');
    var green = document.getElementById('green');
    var blue = document.getElementById('blue');
    var onBtn = document.getElementById('btnOn');
    var offBtn = document.getElementById('btnOff');
    var blinkBtn = document.getElementById('btnBlink');

    function emitValue(color, e) {
        socket.emit('rgb', {
            color: color,
            value: e.target.value
        });
    }

    

    red.addEventListener('change', emitValue.bind(null, 'red'));
    blue.addEventListener('change', emitValue.bind(null, 'blue'));
    green.addEventListener('change', emitValue.bind(null, 'green'));
    onBtn.addEventListener('click', function (){
        socket.emit('onBtn', 'Turning on!')
    });
    offBtn.addEventListener('click', function(){
        socket.emit('offBtn', 'Turning off!')
    });
    blinkBtn.addEventListener('click', function() {
        socket.emit('blinkBtn', 'Blinking!')
    });

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    socket.on('rgb', function(data) {
        var color = data.color;
        document.getElementById(color).value = data.value;
    });
}());