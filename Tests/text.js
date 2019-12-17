var rows = [];
for (var i = 0; i < 2; i++) {
    var row = [];
    for (var j = 0; j < 2; j++) {
        if ((j + i) % 2 == 0)
           row.push(new TextCell("##"));
        else
            row.push(new TextCell("  "));
    }
    rows.push(row);
}

function TextCell(text) {
    this.text = text.split("\n");
}
  
TextCell.prototype.minHeight = function() {
    return this.text.length;
};


function rowHeights(rows) {
     return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}


