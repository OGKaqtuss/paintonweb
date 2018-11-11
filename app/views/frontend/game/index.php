<?php

?>

<div id="lobbyContainer">
    <button class="start-button" id="join">Join</button>
    <button class="start-button" id="create">Create</button>
</div>


<div id="gameContainer" style="display: none;">
    <div id="gameReady">
        <div class="game-ready-container">
            <p class="counter"></p>
            <p class="word"></p>
        </div>
    </div>

    <div class="canvas-container">
        <div class="canvas-inner">
            <div class="word-container">

            </div>
            <canvas height="1000" width="1000" id="game"></canvas>
        </div>
    </div>

    <script src="/min/bundle.js"></script>

</div>