"use strict";

/////////////////////////////////////////
//
// CellAutomata
//
var CellAutomata = function (idScreen) {
	this.Screen = document.getElementById(idScreen);
	this.Ctx = this.Screen.getContext('2d');
	this.ScreenWidth = this.Screen.width;
	this.ScreenHeight = this.Screen.height;
	this.Running = false;

	this.TPS = 60;
	this.TickTime = 1000 / this.TPS;
	this.AccTickTime = this.TickTime;
	this.PreviousTime = 0;

	var self = this;
	this.Tick = function () {
		var procFrames = 10;
		while (self.AccTickTime >= self.TickTime && procFrames > 0) {
			self.Update();
			self.AccTickTime -= self.TickTime;
			procFrames--;
		}
		if (procFrames <= 0) { self.AccTickTime = 0; }
		self.Draw(self.AccTickTime / self.TickTime);

		var timeNow = performance.now();
		self.AccTickTime += timeNow - self.PreviousTime;
		self.PreviousTime = timeNow;

		if (self.Running) {
			window.requestAnimationFrame(self.Tick);
		} else {
			self.FuncEnd(self);
		}
	};

	this.Init();
	this.Start();
};
CellAutomata.prototype = {
	CreateGrid(width, height, funcCell) {
		var grid = [];
		for (var y = 0; y < height; y++) {
			var row = [];
			for (var x = 0; x < width; x++) {
				row.push(funcCell(x, y));
			}
			grid.push(row);
		}
		return grid;
	},
	Start: function () {
		if (this.Running == true) { return; }
		this.Running = true;
		this.PreviousTime = performance.now();
		this.Tick();
	},
	Init: function () {
		this.CellsWidth = 200;
		this.CellsHeight = 100;
		this.Cells = this.CreateGrid(this.CellsWidth, this.CellsHeight, function (x, y) { return false; });
		this.CellsNext = this.CreateGrid(this.CellsWidth, this.CellsHeight, function (x, y) { return false; });

		this.Cells[49][99] = true;
		this.Cells[49][100] = true;
		this.Cells[50][100] = true;
		this.Cells[50][101] = true;
		this.Cells[51][100] = true;

		/*
				// Slider
				this.Cells[50][100] = true;
				this.Cells[51][101] = true;
				this.Cells[52][99] = true;
				this.Cells[52][100] = true;
				this.Cells[52][101] = true;
		*/
	},
	End: function () {
		this.Running = false;
	},
	GetCell: function (x, y) {
		if (x < 0) {
			x = x + (this.CellsWidth * Math.ceil((-x) / this.CellsWidth));
		} else {
			x = x % this.CellsWidth;
		}
		if (y < 0) {
			y = y + (this.CellsHeight * Math.ceil((-y) / this.CellsHeight));
		} else {
			y = y % this.CellsHeight;
		}
		return this.Cells[y][x];
	},
	SetNextCell: function (x, y, v) {
		if (x < 0) {
			x = x + (this.CellsWidth * Math.ceil((-x) / this.CellsWidth));
		} else {
			x = x % this.CellsWidth;
		}
		if (y < 0) {
			y = y + (this.CellsHeight * Math.ceil((-y) / this.CellsHeight));
		} else {
			y = y % this.CellsHeight;
		}
		this.CellsNext[y][x] = v;
	},
	SwapCellsGrids: function () {
		var tempGrid = this.Cells;
		this.Cells = this.CellsNext;
		this.CellsNext = tempGrid;
	},
	CountCellNeighbour: function (x, y) {
		var count = 0;
		if (this.GetCell(x - 1, y - 1)) { count++; }
		if (this.GetCell(x + 0, y - 1)) { count++; }
		if (this.GetCell(x + 1, y - 1)) { count++; }
		if (this.GetCell(x - 1, y + 0)) { count++; }
		if (this.GetCell(x + 1, y + 0)) { count++; }
		if (this.GetCell(x - 1, y + 1)) { count++; }
		if (this.GetCell(x + 0, y + 1)) { count++; }
		if (this.GetCell(x + 1, y + 1)) { count++; }
		return count;
	},
	Update: function () {
		debugger;
		for (var y = 0; y < this.CellsHeight; y++) {
			for (var x = 0; x < this.CellsWidth; x++) {
				var neighbourCount = this.CountCellNeighbour(x, y);
				if (this.GetCell(x, y)) {
					if (neighbourCount == 3 || neighbourCount == 2) {
						this.SetNextCell(x, y, true);
					} else {
						this.SetNextCell(x, y, false);
					}
				} else {
					if (neighbourCount == 3) {
						this.SetNextCell(x, y, true);
					} else {
						this.SetNextCell(x, y, false);
					}
				}
			}
		}
		this.SwapCellsGrids();
	},
	Draw: function () {
		if (this.Screen.width != this.Screen.offsetWidth) {
			this.Screen.width = this.Screen.offsetWidth;
		}
		if (this.Screen.height != this.Screen.offsetHeight) {
			this.Screen.height = this.Screen.offsetHeight;
		}
		this.Ctx.fillStyle = "#000000";
		this.Ctx.fillRect(0, 0, this.Screen.width, this.Screen.height);
		var xStep = this.Screen.width / this.CellsWidth;
		var yStep = this.Screen.height / this.CellsHeight;
		this.Ctx.fillStyle = "#FFFF00";
		for (var y = 0; y < this.CellsHeight; y++) {
			for (var x = 0; x < this.CellsWidth; x++) {
				if (this.Cells[y][x]) {
					this.Ctx.fillRect(xStep * x, yStep * y, xStep, yStep);
				}
			}
		}
	},
	FuncEnd: function () {

	},
};

