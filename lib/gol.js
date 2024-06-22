$(document).ready(function(){

    GOL = {
        "gridSize": 40,
        "grid": new Array(40),
        "gridX": 100,
        "gridY": 0,
        "cellSize": 40,
        "deadCellColor": "#323330",
        "aliveCellColor": "#E0DB4F",
        "layer": new Kinetic.Layer(),
        "stage": new Kinetic.Stage("container", 800, 500)
    };
    
    init();
    
    function init(){
        var layer = GOL.layer;
        initializeGrid(layer);
        initializeButtons(layer);
        GOL.stage.add(layer);
    }
    
    function initializeGrid(layer){
    
        var yCord = GOL.gridY;
        $.each(GOL.grid, function(rowIndex, row){
        
            yCord = yCord + 40;
            var xCord = GOL.gridX;
            row = GOL.grid[rowIndex] = new Array(GOL.gridSize);
            
            $.each(row, function(colIndex, cell){
            
                xCord = xCord + GOL.cellSize;
                cell = new Kinetic.Rect({
                    x: xCord,
                    y: yCord,
                    width: GOL.cellSize,
                    height: GOL.cellSize,
                    fill: GOL.deadCellColor,
                    stroke: "#000000",
                    strokeWidth: 1
                });
                row[colIndex] = cell;
                layer.add(cell);
                
                cell.on("click", function(){
                    if (this.fill == GOL.aliveCellColor) {
                        this.fill = GOL.deadCellColor;
                        this.alive = false;
                    }
                    else {
                        this.fill = GOL.aliveCellColor;
                        this.alive = true;
                    }
                    layer.draw();
                });
            });
            
        });
    }
    
    function initializeButtons(layer){
    
        $("#reset").click(resetGrid);
        $("#next").click(play);
        
    }
    
    function resetGrid(){
        $.each(GOL.grid, function(rowIndex, row){
            $.each(row, function(colIndex, cell){
                cell.fill = GOL.deadCellColor;
            });
        });
        GOL.layer.draw();
        synchronizeGridWithDisplay();
    }
    
    function play(){
        $.each(GOL.grid, function(rowIndex, row){
        
            $.each(row, function(colIndex, cell){
            
                aliveNeighbours = getAliveNeighboursForCellAt(rowIndex, colIndex);
                if (aliveNeighbours == 2 && GOL.grid[rowIndex][colIndex].alive === true) {
                    cell.fill = GOL.aliveCellColor;
                }
                else 
                    if (aliveNeighbours == 3) {
                        cell.fill = GOL.aliveCellColor;
                    }
                    else {
                        cell.fill = GOL.deadCellColor;
                    }
            });
        });
        GOL.layer.draw();
        synchronizeGridWithDisplay();
    }
    
    function synchronizeGridWithDisplay(){
        $.each(GOL.grid, function(rowIndex, row){
            $.each(row, function(colIndex, cell){
                if (cell.fill == GOL.aliveCellColor) {
                    cell.alive = true;
                }
                else {
                    cell.alive = false;
                }
            });
        });
    }
    
    function getAliveNeighboursForCellAt(rowIndex, colIndex){
        var aliveNeighbours = 0;
        var possibleNeighbours = [{
            "x": colIndex - 1,
            "y": rowIndex - 1
        }, {
            "x": colIndex - 1,
            "y": rowIndex
        }, {
            "x": colIndex - 1,
            "y": rowIndex + 1
        }, {
            "x": colIndex,
            "y": rowIndex - 1
        }, {
            "x": colIndex,
            "y": rowIndex + 1
        }, {
            "x": colIndex + 1,
            "y": rowIndex + 1
        }, {
            "x": colIndex + 1,
            "y": rowIndex
        }, {
            "x": colIndex + 1,
            "y": rowIndex - 1
        }];
        $.each(possibleNeighbours, function(index, neighbour){
            if (neighbourAliveAt(neighbour.x, neighbour.y)) {
                aliveNeighbours++;
            }
        });
        return aliveNeighbours;
    }
    
    function neighbourAliveAt(col, row){
        if (col >= 0 && col < GOL.gridSize && row >= 0 && row < GOL.gridSize && GOL.grid[row][col].alive === true) {
            return true;
        }
    }
    
});
