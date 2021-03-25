
function decodeChar(e: string) {
    return e.charCodeAt(0) - 96;
};

export default function parseTask(key: string, puzzleHeight: number, puzzleWidth: number) {
    let e = [];
    for (let i = 0, r = 0; r < key.length; r++)
        '0' <= key[r] && key[r] <= '9' // $.isNumeric(key[r])
            ? (e[i] = key[r], i++)
            : i += decodeChar(key[r]);
    let task: any[][] = [];
    for (var r = 0; r < puzzleHeight; r++) {
        task[r] = [];
        for (var i = 0; i < puzzleWidth; i++) {
            var o = r * puzzleWidth + i;
            "undefined" == typeof e[o]
                ? task[r][i] = -1
                : task[r][i] = parseInt(e[o])
        }
    }
    return task;
}


