function openHTMLEditor(e) {
    editorWin = window.open("htmledit.php?field=" + e, "_new", "width=770, height=500, scrollbars=no, resizable=yes"),
        editorWin.focus()
}
function Set_Cookie(e, t, n, r, i, o) {
    var a = new Date;
    a.setTime(a.getTime()),
        n && (n = 1e3 * n * 60 * 60 * 24);
    var s = new Date(a.getTime() + n);
    document.cookie = e + "=" + escape(t) + (n ? ";expires=" + s.toGMTString() : "") + (r ? ";path=" + r : ";path=/") + (i ? ";domain=" + i : "") + (o ? ";secure" : "")
}
function switchRules(e) {
    return Set_Cookie("hideRules", 1 - e, 1e3),
        document.getElementById("rules").style.display = e ? "block" : "none",
        document.getElementById("norules").style.display = e ? "none" : "block",
        !1
}
function switchSide(e) {
    return Set_Cookie("hideSide", 1 - e, 1e3),
        e ? (document.body.classList.add("expanded"),
            document.body.classList.remove("collapsed")) : (document.body.classList.add("collapsed"),
                document.body.classList.remove("expanded")),
        !1
}
function pad(e) {
    return 1 * e < 10 ? "0" + e : e
}
function beautifyTime(e) {
    return sec = pad(e % 60),
        minutes = pad(Math.floor(e / 60) % 60),
        s = minutes + ":" + sec,
        hours = Math.floor(e / 3600),
        hours > 0 && (s = hours + ":" + s),
        s
}
function timer() {
    startTime || (startTime = (new Date).getTime() - 1e3 * document.answerForm.jstimer.value);
    var e = (new Date).getTime()
        , t = Math.floor((e - startTime) / 1e3);
    try {
        document.answerForm.jstimerShow.value = beautifyTime(t),
            document.answerForm.jstimerShowPersonal.value = beautifyTime(Math.floor((Game.getTimer() + 500) / 1e3))
    } catch (e) { }
    1 * document.answerForm.stopClock.value || (timerTimeout = setTimeout("timer()", 500))
}
function Get_Cookie(e) {
    var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return t ? decodeURIComponent(t[1]) : void 0
}
function getZoom() {
    return "undefined" == typeof Game ? 1 : Settings.get(Game.getSaveIdent() + ".saved-zoom")
}
function setZoom(e) {
    var t = document.getElementById("game");
    if (t) {
        var n = t.clientWidth
            , r = t.clientHeight
            , i = 0
            , o = 0
            , a = 0
            , s = "undefined" == typeof buttonsOffset ? 35 : buttonsOffset;
        $("#buttonsBottom:visible").length && (i = s),
            $("#buttonsRight:visible").length && (a = s),
            $("#buttonsLeft:visible").length && (o = s),
            n && r && (t.style.transform = "scale(" + e + ")",
                t.style.marginLeft = Math.floor(1 + (n * e - n) / 2) + o * e + "px",
                t.style.marginRight = Math.floor(1 + (n * e - n) / 2) + a * e + "px",
                t.style.marginTop = Math.floor(1 + (r * e - r) / 2) + "px",
                t.style.marginBottom = Math.floor(1 + (r * e - r) / 2) + i * e + "px",
                Settings.set(Game.getSaveIdent() + ".saved-zoom", e),
                puzzleZoom = e)
    }
}
function zoomIn() {
    puzzleZoom < maxZoom && (puzzleZoom = 1.1 * puzzleZoom,
        setZoom(puzzleZoom))
}
function zoomOut() {
    puzzleZoom > minZoom && (puzzleZoom /= 1.1,
        setZoom(puzzleZoom))
}
function getDisplay(e) {
    return e.currentStyle ? e.currentStyle.display : getComputedStyle(e, null).display
}
function toggleZoomSlider(e) {
    var t = document.getElementById("zoomSlider")
        , n = getDisplay(t);
    "undefined" != typeof e ? t.style.display = "on" == e ? "block" : "none" : t.style.display = "none" == n ? "block" : "none"
}
function storeState(e) {
    stateIndex != -1 && states[stateIndex] == e || (stateIndex++,
        states[stateIndex] = e,
        states.splice(stateIndex + 1))
}
function undoMove() {
    stateIndex && (stateIndex--,
        setState(states[stateIndex]))
}
function redoMove() {
    states.length > stateIndex + 1 && (stateIndex++,
        setState(states[stateIndex]))
}
function switchNightMode(e) {
    return Set_Cookie("nightMode", 1 * e, 1e3),
        document.documentElement.className = e ? "nightmode" : "",
        !1
}
function switchASLMode(e) {
    return Set_Cookie("aslMode", 1 * e, 1e3),
        document.location.reload(),
        !1
}
function numberWithCommas(e) {
    return "undefined" == typeof e ? 0 : e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function sumSolved(e) {
    var t = 0;
    for (var n in e)
        e.hasOwnProperty(n) && (t += e[n].nsolved);
    return numberWithCommas(t)
}
function getPermalink4(e) {
    $.post("/permalink.php", {
        size: Game.plSize,
        state: JSON.stringify(Game.getSaveState()),
        img: e
    }).done(function (e) {
        var t = "https://" + window.location.hostname + window.location.pathname + "?pl=" + e
            , n = "https://" + window.location.hostname + "/screenshots/" + e + ".png"
            , r = $("#shareLinkText").val()
            , i = "https://" + window.location.hostname + window.location.pathname + "?e=" + btoa(Game.plSize + ":" + Game.getSetting("puzzleID"))
            , o = '<iframe width="' + (Game.getBoardWidth() + 130) + '" height="' + (Game.getBoardHeight() + 300) + '" src="' + i + '" frameborder="0" />';
        $("#shareLinkInput").val(t),
            $("#shareImgInput").val(n),
            $("#shareEmbedURLInput").val(i),
            $("#shareEmbedInput").val(o),
            $("#shareLinkFB").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(t) + "&quote=" + encodeURIComponent(r)),
            $("#shareLinkTW").attr("href", "https://twitter.com/intent/tweet?via=PuzzleTeamClub&text=" + encodeURIComponent(r) + " " + encodeURIComponent(t)),
            $("#shareContainer").show(),
            $("#shareContainerElements").show(),
            $("#shareContainerLoader").hide()
    })
}
function getPermalink3() {
    html2canvas($("#puzzleContainer")[0]).then(function (e) {
        getPermalink4(e.toDataURL("png"))
    })
}
function getPermalink2() {
    "undefined" == typeof html2canvas ? $.cachedScript("/js/html2canvas-v1.0.0.min.js").done(function (e, t) {
        getPermalink3()
    }) : getPermalink3()
}
function getPermalink1() {
    "undefined" == typeof Promise ? $.cachedScript("/js/es6-promise-4.1.1.auto.min.js").done(function (e, t) {
        getPermalink2()
    }) : getPermalink2()
}
function lg(e) {
    var t = document.getElementById("lg");
    t.innerHTML = ++lgCounter + e + "<br>" + t.innerHTML
}
function hideGlobalNotifications() {
    $(".global-alert-info").removeClass("show").find(".message").html(""),
        $(".global-alert-success").removeClass("show").find(".message").html(""),
        $(".global-alert-error").removeClass("show").find(".message").html("")
}
function showError(e, t) {
    hideGlobalNotifications();
    var n = $(".global-alert-error").addClass("show");
    n.find(".message").html(e),
        n.find(".js-box-close-global").toggle(!t)
}
function showSuccess(e, t) {
    hideGlobalNotifications();
    var n = $(".global-alert-success").addClass("show");
    n.find(".message").html(e),
        n.find(".js-box-close-global").toggle(!t)
}
function showInfo(e, t) {
    hideGlobalNotifications();
    var n = $(".global-alert-info").addClass("show");
    n.find(".message").html(e),
        n.find(".js-box-close-global").toggle(!t)
}
function createCookie(e, t, n) {
    var r = "";
    if (n) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3),
            r = "; expires=" + i.toUTCString()
    }
    document.cookie = e + "=" + t + r + "; path=/"
}
function readCookie(e) {
    for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
        for (var i = n[r]; " " == i.charAt(0);)
            i = i.substring(1, i.length);
        if (0 == i.indexOf(t))
            return i.substring(t.length, i.length)
    }
    return null
}
function eraseCookie(e) {
    createCookie(e, "", -1)
}
function init() {
    timer()
}
function getHiddenPropertyName(e) {
    return e ? e + "Hidden" : "hidden"
}
function getVisibilityEvent(e) {
    return (e ? e : "") + "visibilitychange"
}
function getBrowserPrefix() {
    for (var e = 0; e < browserPrefixes.length; e++)
        if (getHiddenPropertyName(browserPrefixes[e]) in document)
            return browserPrefixes[e];
    return null
}
function onVisible() {
    isVisible || (isVisible = !0,
        "undefined" == typeof Game || Settings.get("global.hide-timer") || Game.resumeTimer())
}
function onHidden() {
    isVisible && (isVisible = !1,
        "undefined" == typeof Game || Settings.get("global.hide-timer") || Game.pauseTimer())
}
function handleVisibilityChange(e) {
    return "boolean" == typeof e ? e ? onVisible() : onHidden() : document[hiddenPropertyName] ? onHidden() : onVisible()
}
function puzzle(e) {
    this.maxColumnNumbers = 0,
        this.maxRowNumbers = 0,
        this.task = [],
        this.currentState = {
            cellStatus: [],
            taskStatus: [],
            lastMove: {},
            index: 0
        },
        this.currentMove = {
            cellStatus: 0,
            startPoint: {
                row: 0,
                col: 0
            },
            endPoint: {
                row: 0,
                col: 0
            },
            cells: []
        },
        this.states = [],
        this.dom = {},
        this.panTimeThreshold = e.panTimeThreshold ? e.panTimeThreshold : Config.panTimeThreshold,
        this.zoomingPanning = !1,
        this.solved = !1,
        this.drawing = !1,
        this.mouseDown = !1,
        this.dragMonitor = {
            decision: "unknown",
            timeStart: 0,
            touchstartX: 0,
            touchstartY: 0
        },
        this.boardWidth = 0,
        this.boardHeight = 0,
        this.lastAppliedScale = 1,
        this.accumulated = 0,
        this.paused = 0,
        this.forcePaused = 0,
        this.lastTrackedTime = (new Date).getTime(),
        this.inputMode = "mouse",
        this.checkpoints = [],
        this.getBoardWidth = function () { }
        ,
        this.getBoardHeight = function () { }
        ,
        this.getTransform = function (e) {
            var t = /matrix\((.*)\)/
                , n = e.css("transform").match(t);
            return n ? n[1].split(",") : [0, 0, 0, 0, 0, 0]
        }
        ,
        this.getScale = function () {
            try {
                var e = /matrix\((.*)\)/
                    , t = this.css("transform").match(e)[1].split(",")
                    , n = parseFloat(t[0]);
                return n || (n = 1),
                    n
            } catch (e) {
                return 1
            }
        }
        ,
        this.decodeChar = function (e) {
            return e.charCodeAt(0) - 96
        }
        ,
        this.toChar = function (e) {
            return parseInt(e).toString(20).toUpperCase()
        }
        ,
        this.decodeTaskFormat = function (e, t) {
            for (var n = [], r = 0, i = 0; i < e.length; i++)
                if ($.isNumeric(e[i])) {
                    for (var o = ""; $.isNumeric(e[i]);)
                        o += "" + e[i],
                            i++;
                    i--,
                        t ? n[r] = this.toChar(o) : n[r] = parseInt(o),
                        r++
                } else
                    "_" != e[i] && (r += this.decodeChar(e[i]));
            return n
        }
        ,
        this.rowFromIndex = function (t) {
            return Math.floor(t / e.puzzleWidth)
        }
        ,
        this.colFromIndex = function (t) {
            return t % e.puzzleWidth
        }
        ,
        this.rowColFromIndex = function (e) {
            return {
                row: this.rowFromIndex(e),
                col: this.colFromIndex(e)
            }
        }
        ,
        this.cellIndex = function (t) {
            return t.row * e.puzzleWidth + t.col
        }
        ,
        this.parseTask = function () { }
        ,
        this.setCellState = function (e, t) {
            this.currentState.cellStatus[e.row][e.col] = t
        }
        ,
        this.applyCurrentMoveToState = function () {
            for (var e = this.currentMove.cells.length, t = 0; t < e; t++) {
                var n = this.currentMove.cells[t];
                this.setCellState(n, this.currentMove.cellStatus)
            }
            this.currentState.lastMove = Util.clone(this.currentMove),
                this.storeCurrentState()
        }
        ,
        this.resetCurrentMoveDraw = function () {
            for (var e = this.currentMove.cells.length, t = 0; t < e; t++) {
                var n = this.currentMove.cells[t];
                this.drawCellStatus(n, this.getCurrentStatus(n))
            }
        }
        ,
        this.drawMoveHelpers = function () { }
        ,
        this.hideMoveHelpers = function () {
            this.dom.helperNumberOfDrawnCells.hide()
        }
        ,
        this.drawCurrentMove = function () {
            for (var e = this.currentMove.cells.length, t = 0; t < e; t++) {
                var n = this.currentMove.cells[t];
                this.drawCellStatus(n, this.currentMove.cellStatus)
            }
            this.drawMoveHelpers()
        }
        ,
        this.initCurrentMove = function () {
            this.currentMove = {
                cellStatus: 0,
                startPoint: {
                    row: 0,
                    col: 0
                },
                endPoint: {
                    row: 0,
                    col: 0
                },
                cells: []
            }
        }
        ,
        this.cancelMove = function () {
            this.resetCurrentMoveDraw(),
                this.initCurrentMove(),
                this.hideMoveHelpers()
        }
        ,
        this.getCurrentStatus = function (e) {
            return this.currentState.cellStatus[e.row][e.col]
        }
        ,
        this.getNextStatus = function (e, t) {
            var n = this.getCurrentStatus(e);
            return "rotate" == Settings.get(this.slug + ".draw-style") ? (t ? n-- : n++,
                (n + 3) % 3) : "white" == Settings.get(this.slug + ".draw-style") ? 0 : "black" == Settings.get(this.slug + ".draw-style") ? t ? 2 == n ? 0 : 2 : 1 == n ? 0 : 1 : "cross" == Settings.get(this.slug + ".draw-style") ? t ? 1 == n ? 0 : 1 : 2 == n ? 0 : 2 : n
        }
        ,
        this.helpers = function () { }
        ,
        this.startMove = function (e, t, n) {
            this.initCurrentMove(),
                this.drawing = !0,
                this.currentMove.invert = "undefined" != typeof t && t,
                this.currentMove.cellStatus = this.getNextStatus(e, t),
                this.currentMove.startPoint = {
                    row: e.row,
                    col: e.col
                },
                this.currentMove.endPoint = {
                    row: e.row,
                    col: e.col
                },
                this.currentMove.cells.push({
                    row: e.row,
                    col: e.col
                }),
                n && this.drawCurrentMove()
        }
        ,
        this.performMove = function (e) { }
        ,
        this.onEndMove = function () { }
        ,
        this.endMove = function () {
            this.zoomingPanning || (this.applyCurrentMoveToState(),
                this.drawCurrentMove(),
                this.onEndMove(),
                this.drawHelperHighlightMove(this.currentMove),
                this.helpers(),
                this.hideMoveHelpers(),
                this.checkFinished()),
                this.drawing = !1
        }
        ,
        this.getNumberOfDrawnCells = function () {
            return "implement me"
        }
        ,
        this.showHelperNumberOfDrawnCells = function (t, n, r, i, o) {
            i || (i = this.dom.helperNumberOfDrawnCells.width()),
                o || (o = this.dom.helperNumberOfDrawnCells.height());
            var a = document.documentElement.clientWidth / window.innerWidth;
            if (a < 1 && (a = 1),
                e.relativeTo) {
                var s = $(e.relativeTo).offset();
                t += Layout.scrollLeft() - s.left,
                    n -= s.top
            }
            var c = n + Layout.scrollTop() - 100 / a - o / a + (Layout.hiddenHeader() ? Config.headerHeight / a : 0)
                , u = 0
                , d = 0;
            if (l < 50 && (u = 17),
                e.relativeTo && (u = -s.top,
                    d = -s.left),
                Settings.get("global.left-handed")) {
                var l = t + i / a
                    , f = Layout.clientWidth();
                Layout.portrait || (f -= Config.sidebarWidth),
                    e.relativeTo || l + i + 5 > f && (l = f - i - 5)
            } else {
                var l = t - i / a - 15 / a;
                l < d && (l = d)
            }
            c < Layout.scrollTop() + u && (c = Layout.scrollTop() + u),
                this.dom.helperNumberOfDrawnCells.show().css({
                    top: c + "px",
                    left: l + "px"
                }).html(r),
                a != this.lastAppliedScale && (1 != a ? this.dom.helperNumberOfDrawnCells.css({
                    transform: "scale(" + 1 / a + ")"
                }) : this.dom.helperNumberOfDrawnCells.css({
                    transform: "none"
                }),
                    this.lastAppliedScale = a)
        }
        ,
        this.drawHelperNumberOfDrawnCells = function (e, t) {
            if (this.currentMove.cellStatus) {
                var n = this.getNumberOfDrawnCells();
                n && this.showHelperNumberOfDrawnCells(e, t, n)
            }
        }
        ,
        this.initNumberOfDrawnCellsHelper = function () {
            0 == $(".helper-nodc").length && (this.dom.helperNumberOfDrawnCells = $('<div class="helper-nodc">').css({
                position: "absolute",
                top: "100px",
                left: "100px",
                "z-index": "1000"
            }),
                e.relativeTo ? $(e.relativeTo).after(this.dom.helperNumberOfDrawnCells) : $("#scene").append(this.dom.helperNumberOfDrawnCells))
        }
        ,
        this.highlightCell = function (e, t) {
            this.dom.cells[e.row][e.col].addClass(t)
        }
        ,
        this.drawHelperHighlightMove = function (e) {
            if (Settings.get(this.slug + ".highlight-change") && ($(".cell-active").removeClass("cell-active"),
                e.cells))
                for (var t = 0; t < e.cells.length; t++)
                    this.highlightCell(e.cells[t], "cell-active")
        }
        ,
        this.initCrosshairHelper = function () {
            0 == $(".helper-crosshair").length && (this.dom.helperCrosshair = $('<div class="helper-crosshair"><i class="icon icon-cursor"></i><i class="icon icon-move"></i><div class="crosshair-btn"></div></div>'),
                $("#scene").append(this.dom.helperCrosshair)),
                Settings.get(this.slug + ".show-crosshair") ? this.dom.helperCrosshair.show() : this.dom.helperCrosshair.hide()
        }
        ,
        this.drawCellStatus = function (e, t) { }
        ,
        this.drawCurrentState = function () { }
        ,
        this.draw = function () { }
        ,
        this.getFitMatrix = function (t) {
            var n = 1;
            Settings.get(this.slug + ".saved-scale") && (n = Settings.get(this.slug + ".saved-scale"));
            var r = this.parent()[0].getBoundingClientRect()
                , i = r.height - Config.headerHeight - Config.scenePaddingBottom - Layout.getBottomBannerHeight() - 30;
            Layout.portrait && (i -= Config.footerHeight);
            var o = this.boardWidth
                , a = this.boardHeight
                , s = o * n
                , c = a * n;
            t || ((s > r.width || c > i) && (n = Math.min(r.width / o, i / a)),
                n < e.minScale && (n = e.minScale));
            var u = (r.width - this.boardWidth) / 2
                , d = (n - 1) * this.boardHeight / 2 + (Config.headerHeight - Config.paddingTop);
            return d += 25,
                d += Layout.scrollTop(),
                "matrix(" + n + ", 0, 0, " + n + ", " + u + ", " + d + ")"
        }
        ,
        this.fitCrosshair = function () {
            matrix = "matrix(1, 0, 0, 1, " + (Layout.clientWidth() - Config.crosshairWidth) / 2 + ", 100 )",
                this.dom.helperCrosshair.panzoom("option", {
                    startTransform: matrix
                })
        }
        ,
        this.fit = function (e) {
            var t = this.getFitMatrix(e);
            this.panzoom("option", {
                startTransform: t
            }),
                this.panzoom("reset"),
                this.panzoomAction(),
                this.fitCrosshair()
        }
        ,
        this.repositionHelpers = function () { }
        ,
        this.getCrosshairTarget = function () {
            var e = this.getTransform(this.dom.helperCrosshair)
                , t = 1 * e[4] - 1;
            Settings.get("global.left-handed") && (t = 1 * e[4] + 1 * Config.crosshairWidth + 1);
            var n = e[5] - 1 - Layout.scrollTop() + (Layout.hiddenHeader() ? 0 : Config.headerHeight)
                , r = $(document.elementFromPoint(t, n));
            return r.length && r.hasClass("selectable") || (r = this.findNearestCell(t, n, "selectable")),
                r.chLeft = t,
                r.chTop = n,
                r
        }
        ,
        this.highlightCrosshairCell = function (e) {
            $(".cell-crosshair").removeClass("cell-crosshair"),
                e.length && e.addClass("cell-crosshair")
        }
        ,
        this.eventsCrosshairMove = function (e) { }
        ,
        this.crosshairPan = function () {
            var e = this.getCrosshairTarget();
            this.highlightCrosshairCell(e),
                e.length && this.eventsCrosshairMove(e)
        }
        ,
        this.stateChangedBoard = function () { }
        ,
        this.stateChangedTask = function () { }
        ,
        this.stateChanged = function () {
            return this.currentState.index == -1 || (!!this.stateChangedBoard() || !!this.stateChangedTask())
        }
        ,
        this.initState = function () { }
        ,
        this.resetState = function () {
            this.initState(),
                this.redraw()
        }
        ,
        this.loadState = function (e) { }
        ,
        this.setState = function (e) {
            this.loadState({
                board: e
            }),
                this.drawCurrentState(),
                this.check()
        }
        ,
        this.restoreCurrentState = function () {
            this.currentState = Util.clone(this.states[this.currentState.index]),
                this.drawCurrentState()
        }
        ,
        this.storeCurrentState = function () {
            this.stateChanged() && (this.currentState.index++,
                this.states[this.currentState.index] = Util.clone(this.currentState),
                this.states.splice(this.currentState.index + 1),
                this.saveState())
        }
        ,
        this.undo = function () {
            this.currentState.index && (this.currentState = Util.clone(this.states[this.currentState.index - 1]),
                this.cancelMove(),
                this.drawCurrentState(),
                this.saveState(!0))
        }
        ,
        this.redo = function () {
            this.states.length > this.currentState.index + 1 && (this.currentState = Util.clone(this.states[this.currentState.index + 1]),
                this.cancelMove(),
                this.drawCurrentState(),
                this.saveState(!0))
        }
        ,
        this.saveCheckpoint = function () {
            this.checkpoints || (this.checkpoints = []),
                this.checkpoints.push(Util.clone(this.currentState)),
                this.saveState(!0)
        }
        ,
        this.removeCheckpoint = function (e) {
            this.checkpoints.splice(e, 1),
                this.saveState(!0)
        }
        ,
        this.loadCheckpoint = function (e) {
            var t = this.checkpoints[e];
            if ("undefined" != typeof this.states[t.index] && JSON.stringify(t) == JSON.stringify(this.states[t.index]))
                this.currentState = Util.clone(t);
            else {
                var n = this.states.length;
                this.currentState = Util.clone(t),
                    this.currentState.index = n,
                    this.checkpoints[e].index = n,
                    this.states[this.currentState.index] = Util.clone(t)
            }
            this.drawCurrentState(),
                this.saveState(!0)
        }
        ,
        this.panzoomAction = function () {
            this.zoomingPanning = !0,
                Settings.set(this.slug + ".saved-scale", this.getScale()),
                this.cancelMove(),
                this.repositionHelpers()
        }
        ,
        this.redraw = function () {
            this.draw(),
                this.fit()
        }
        ,
        this.findNearestCell = function (t, n, r) {
            var i = this.getScale() * e.separatorWidth;
            r || (r = "cell");
            for (var o = !1, a = -i; a <= i; a += i)
                for (var s = -i; s <= i; s += i)
                    if (target = $(document.elementFromPoint(t + a, n + s)),
                        target.hasClass(r)) {
                        if (a && s && !o) {
                            o = target;
                            continue
                        }
                        return target
                    }
            return o
        }
        ,
        this.getChangedTouch = function (e) {
            return "touchstart" == e.type || "touchmove" == e.type ? e.originalEvent.changedTouches[0] : e.originalEvent
        }
        ,
        this.getOffset = function (e) {
            var t = this.getChangedTouch(e);
            if ("touchstart" == e.type || "touchmove" == e.type)
                var n = e.target.getBoundingClientRect()
                    , r = this.getScale()
                    , i = (t.pageX - n.left - Layout.scrollLeft()) / r
                    , o = (t.pageY - n.top - Layout.scrollTop()) / r;
            else
                var i = t.offsetX
                    , o = t.offsetY;
            return {
                offsetX: i,
                offsetY: o
            }
        }
        ,
        this.handleTouchStart = function (e) { }
        ,
        this.eventsTouchStart = function (e) {
            if ("touchstart" == e.type) {
                var t = e.originalEvent.changedTouches[0]
                    , n = e.touches || e.originalEvent.touches;
                if (n.length > 1 || Settings.get($this.slug + ".show-crosshair"))
                    $this.dragMonitor.decision = "panzoom",
                        $this.cancelMove();
                else {
                    if ("draw" == Settings.get($this.slug + ".touch-mode"))
                        $this.dragMonitor.decision = "draw";
                    else {
                        if ("move" == Settings.get($this.slug + ".touch-mode"))
                            return $this.dragMonitor.decision = "panzoom",
                                !1;
                        $this.dragMonitor.timeStart = (new Date).getTime(),
                            $this.dragMonitor.touchstartX = t.clientX,
                            $this.dragMonitor.touchstartY = t.clientY
                    }
                    $this.handleTouchStart(e)
                }
            } else {
                if ("move" == Settings.get($this.slug + ".touch-mode"))
                    return $this.dragMonitor.decision = "panzoom",
                        !1;
                $this.handleTouchStart(e)
            }
        }
        ,
        this.eventsTouchMove = function (e) { }
        ,
        this.eventsTouchEnd = function (e) { }
        ,
        this.eventsClick = function (e) { }
        ,
        this.eventsMove = function (e) { }
        ,
        this.onMouseWheel = function (e) {
            if (e.originalEvent || (e.originalEvent = e),
                $("body").hasClass("hide-mainmenu") && $("body").hasClass("hide-puzzlemenu")) {
                e.preventDefault();
                var t = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
                t / 120 > 0 ? $this.panzoom("zoom", 1.1 * $this.getScale()) : $this.panzoom("zoom", $this.getScale() / 1.1)
            }
        }
        ,
        this.initEventHandlers = function () {
            $(window).on("orientationchange resize", function (e) {
                $this.fit(!0),
                    $this.panzoomAction()
            }).on("scroll", function () {
                $this.panzoomAction()
            }).on("DOMMouseScroll MozMousePixelScroll", this.onMouseWheel),
                document.addEventListener("mousewheel", this.onMouseWheel, {
                    passive: !1
                }),
                $this.fit(),
                $this.panzoomAction(),
                $this.on("mousedown touchstart", function (t) {
                    e.readonly || ($this.mouseDown = !0,
                        $this.zoomingPanning = !1,
                        $this.eventsTouchStart(t))
                }),
                $this.on("dragstart", function (e) {
                    e.preventDefault()
                }),
                $this.attr("unselectable", "on").on("selectstart", !1),
                $(document).on("mouseup touchend", function (e) {
                    $this.eventsClick(e)
                }),
                $(document).on("mouseup touchend", function (e) {
                    $this.mouseDown && (e.preventDefault(),
                        "panzoom" != $this.dragMonitor.decision && "markTask" != $this.dragMonitor.decision && $this.endMove(),
                        $this.mouseDown = !1,
                        $this.dragMonitor = {
                            decision: "unknown",
                            timeStart: 0,
                            touchstartX: 0,
                            touchstartY: 0
                        }),
                        $this.eventsTouchEnd(e)
                }),
                $this.on("touchmove mousemove", function (e) {
                    if ($this.mouseDown) {
                        var t = $this.getChangedTouch(e);
                        if ("touchmove" == e.type)
                            var n = e.touches || e.originalEvent.touches;
                        else
                            var n = [t];
                        if ("unknown" == $this.dragMonitor.decision && 1 == n.length) {
                            var r = (new Date).getTime() - $this.dragMonitor.timeStart
                                , i = Math.sqrt(($this.dragMonitor.touchstartX - t.clientX) * ($this.dragMonitor.touchstartX - t.clientX) + ($this.dragMonitor.touchstartY - t.clientY) * ($this.dragMonitor.touchstartY - t.clientY));
                            r < $this.panTimeThreshold && i > Config.panPixelThreshold ? $this.dragMonitor.decision = "panzoom" : r > $this.panTimeThreshold && i < Config.panPixelThreshold && ($this.dragMonitor.decision = "draw")
                        }
                        "panzoom" != $this.dragMonitor.decision && e.stopPropagation(),
                            "draw" == $this.dragMonitor.decision && (e.preventDefault(),
                                $this.eventsTouchMove(e))
                    } else
                        $this.eventsMove(e)
                }),
                $this.dom.helperCrosshair.on("mousedown touchstart", function (e) {
                    e.preventDefault()
                }).contextmenu(function () {
                    return !1
                }),
                $(".crosshair-btn").on("mousedown touchstart", function (t) {
                    if (!e.readonly) {
                        t.preventDefault();
                        var n = $this.getCrosshairTarget();
                        n.length && ($this.mouseDown = !0,
                            $this.zoomingPanning = !1,
                            $this.eventsCrosshairMouseDown(t, n))
                    }
                }).on("mouseup touchend", function (e) {
                    e.preventDefault(),
                        $this.endMove(),
                        $this.mouseDown = !1,
                        $this.dragMonitor = {
                            decision: "unknown",
                            timeStart: 0,
                            touchstartX: 0,
                            touchstartY: 0
                        }
                }),
                e.readonly || (window.setInterval(function (e) {
                    return function () {
                        e.loaded && e.tickTimer()
                    }
                }($this), 500),
                    $this.tickTimer())
        }
        ,
        this.storeTimer = function () {
            if (!e.readonly)
                try {
                    localStorage.setItem("timer-" + this.getSaveIdent(), this.accumulated)
                } catch (e) { }
        }
        ,
        this.getTimer = function () {
            try {
                return 1 * localStorage.getItem("timer-" + this.getSaveIdent())
            } catch (e) {
                return 0
            }
        }
        ,
        this.tickTimer = function () {
            if (!e.readonly && !this.paused) {
                var t = (new Date).getTime();
                this.accumulated = this.getTimer(),
                    this.accumulated += t - this.lastTrackedTime,
                    this.lastTrackedTime = t,
                    this.storeTimer()
            }
        }
        ,
        this.pauseTimer = function (t) {
            e.readonly || this.paused || (this.tickTimer(),
                this.paused = 1,
                t && (this.forcePaused = 1),
                Settings.get("global.non-competitive-timer") && $("body").addClass("paused"))
        }
        ,
        this.resumeTimer = function (t) {
            e.readonly || this.paused && (this.forcePaused && !t || (this.lastTrackedTime = (new Date).getTime(),
                this.forcePaused = 0,
                this.paused = 0,
                $("body").removeClass("paused")))
        }
        ,
        this.resetTimer = function () {
            e.readonly || (this.accumulated = 0,
                this.lastTrackedTime = (new Date).getTime(),
                this.storeTimer())
        }
        ,
        this.loadGame = function (t) {
            e = $.extend(e, t),
                this.parseTask(),
                this.initState(),
                this.initCurrentMove(),
                e.state && this.loadState(e.state),
                e.savedState && (this.currentState = e.savedState,
                    this.currentState.index = -1,
                    this.checkpoints = e.checkpoints,
                    this.storeCurrentState()),
                this.saveState(),
                this.redraw(),
                e.onLoaded && e.onLoaded(this, t)
        }
        ,
        this.loadNew = function () {
            $.ajax(e.baseUrl + "/get").done(function (t) {
                e.savedState = !1,
                    e.checkpoints = [],
                    $this.loadGame(t),
                    $this.initState(),
                    $this.saveState(),
                    $this.redraw(),
                    e.onLoadNew && e.onLoadNew()
            })
        }
        ,
        this.serializeState = function () { }
        ,
        this.serializeSolution = function () { }
        ,
        this.getBaseSaveIdent = function () {
            return this.slug + ".save." + e.ident
        }
        ,
        this.getSaveIdent = function () {
            var t = "";
            return e.special && (t = "." + e.specialDate),
                this.getBaseSaveIdent() + t
        }
        ,
        this.getSaved = function () {
            return Settings.get(this.getSaveIdent())
        }
        ,
        this.setSetting = function (t, n) {
            e[t] = n
        }
        ,
        this.getSetting = function (t) {
            return e[t]
        }
        ,
        this.getSaveState = function () {
            return {
                task: e.task,
                check: e.check,
                token: e.token,
                puzzleID: e.puzzleID,
                localTimer: e.localTimer,
                savedState: this.currentState,
                checkpoints: this.checkpoints
            }
        }
        ,
        this.stateModified = function () {
            return this.currentState.index
        }
        ,
        this.saveState = function (t) {
            if (this.stateModified() || !e.relativeTo || "undefeind" != typeof t)
                if (this.solved)
                    Settings.remove(this.getSaveIdent());
                else {
                    var n = this.getSaveState();
                    Settings.set(this.getSaveIdent(), n, !0)
                }
        }
        ,
        this.check = function (t) {
            e.noCheck || this.solved || ("" != e.solution ? (!e.checkState && e.solution == this.serializeSolution() || e.solution == this.serializeState()) && e.onSolutionSuccess && e.onSolutionSuccess({}) : $.post(e.baseUrl, {
                token: e.token,
                solution: this.serializeSolution()
            }).done(function (n) {
                n.status ? ($this.solved = !0,
                    Settings.remove($this.getSaveIdent()),
                    e.onSolutionSuccess && e.onSolutionSuccess(n)) : t && "undefined" != typeof t || e.onSolutionError && e.onSolutionError(n)
            }))
        }
        ,
        this.giveUp = function () {
            $.post(e.baseUrl + "/giveUp", {
                token: e.token
            }).done(function (t) {
                t.status ? ($this.solved = !0,
                    $this.readonly = !0,
                    Settings.remove($this.getSaveIdent()),
                    $this.setState(t.solution),
                    e.onSolutionSuccess && e.onSolutionSuccess(t)) : e.onSolutionError && e.onSolutionError(t)
            })
        }
        ,
        this.getMarkedCount = function () { }
        ,
        this.checkFinished = function () {
            !this.solved && this.loaded && (this.blacks > 0 || e.checkState) && this.getMarkedCount() == this.blacks && this.check(!0)
        }
        ,
        this.getOldSaved = function () {
            return Settings.get(this.getBaseSaveIdent())
        }
        ,
        this.copyOldSpecialSavedState = function () {
            localStorage.setItem("timer-" + this.getSaveIdent(), 1 * localStorage.getItem("timer-" + this.getBaseSaveIdent())),
                localStorage.removeItem("timer-" + this.getBaseSaveIdent()),
                Settings.set(this.getSaveIdent() + ".saved-zoom", Settings.get(this.getBaseSaveIdent() + ".saved-zoom")),
                Settings.remove(this.getBaseSaveIdent() + ".saved-zoom"),
                Settings.set(this.getSaveIdent(), Settings.get(this.getBaseSaveIdent())),
                Settings.remove(this.getBaseSaveIdent())
        }
        ,
        this.escapeRegExp = function (e) {
            return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }
        ,
        this.initGame = function () {
            $this = this,
                this.parseTask(),
                this.initState(),
                this.draw();
            var t = this.getFitMatrix();
            try {
                if (e.special && !this.specialsHandled) {
                    var n = new RegExp(this.escapeRegExp(this.getBaseSaveIdent()) + "\\.(\\d{4}-\\d{2}-\\d{2})$");
                    for (k in Settings.bag)
                        (found = k.match(n)) && new Date(found[1]) < new Date(e.lastValidSpecial) && (Settings.remove(k),
                            Settings.remove(k + ".saved-zoom"),
                            localStorage.removeItem("timer-" + k));
                    this.specialsHandled = 1
                }
            } catch (e) { }
            return this.panzoom({
                onPan: function () {
                    $this.panzoomAction()
                },
                onZoom: function () {
                    $this.panzoomAction()
                },
                duration: 0,
                cursor: "default",
                which: "move" == Settings.get(this.slug + ".touch-mode") || Settings.get(this.slug + ".show-crosshair") ? 1 : 2,
                minScale: e.minScale ? e.minScale : .25,
                maxScale: 8,
                contain: "dontLeaveMiddle",
                animate: !1,
                startTransform: t
            }),
                this.dom.helperCrosshair.panzoom({
                    onPan: function () {
                        $this.crosshairPan()
                    },
                    disableZoom: !0,
                    propagate: !0,
                    which: 1
                }),
                this
        }
}
function loadUser() {
    User.loadFromAjax()
}
function showXPTeaser(e) {
    $("#effect-xp").text("+" + e),
        $("#effect-xp").removeClass("animate"),
        setTimeout(function () {
            $("#effect-xp").addClass("animate")
        }, 10)
}
function checkLogin() {
    return !!User.logged || ($.featherlight("/partials/form.login.php", {}),
        !1)
}
function tryLogged() {
    readCookie("api_token")
}
function initAdserver() {
    pbjs.initAdserverSet || (pbjs.que.push(function () {
        pbjs.enableAnalytics([{
            provider: "sovrn",
            options: {
                affiliateId: 252739
            }
        }])
    }),
        pbjs.initAdserverSet = !0,
        __tcfapi("getTCData", 2, function (e, t) {
            if (globalTCData = e,
                !e.gdprApplies || e.purpose.consents[1] && e.vendor.consents[755])
                window.googletag.pubads().getSlots().forEach(function (e) {
                    e.setTargeting("hb_domain", domain)
                }),
                    googletag.cmd.push(function () {
                        pbjs.que.push(function () {
                            pbjs.setTargetingForGPTAsync(),
                                googletag.pubads().refresh()
                        })
                    });
            else
                for (var n = 0; n < pbjs.adUnits.length; n++) {
                    var r = pbjs.getAdserverTargetingForAdUnitCode(pbjs.adUnits[n].code);
                    if (r && r.hb_adid) {
                        document.getElementById(pbjs.adUnits[n].code).innerHTML = prebidPassbacks[pbjs.adUnits[n].code];
                        var i = document.getElementById("postbid_iframe_" + pbjs.adUnits[n].code)
                            , o = i.contentWindow.document;
                        pbjs.renderAd(o, r.hb_adid)
                    }
                }
        }))
}
function getNewAds(e) {
    pbjs.que.push(function () {
        pbjs.requestBids({
            timeout: PREBID_TIMEOUT,
            adUnitCodes: [e.getSlotElementId()],
            bidsBackHandler: function () {
                if (__tcfapi("getTCData", 2, function (e, t) {
                    globalTCData = e
                }),
                    !globalTCData.gdprApplies || globalTCData.purpose.consents[1] && globalTCData.vendor.consents[755])
                    pbjs.setTargetingForGPTAsync([e.getSlotElementId()]),
                        googletag.pubads().refresh([e]);
                else {
                    var t = pbjs.getAdserverTargetingForAdUnitCode(e.getSlotElementId());
                    if (t && t.hb_adid) {
                        document.getElementById(e.getSlotElementId()).innerHTML = prebidPassbacks[e.getSlotElementId()];
                        var n = document.getElementById("postbid_iframe_" + e.getSlotElementId())
                            , r = n.contentWindow.document;
                        pbjs.renderAd(r, t.hb_adid)
                    }
                }
            }
        })
    })
}
function getNewAdsTop() {
    getNewAds(topSlot)
}
function getNewAdsSide() {
    getNewAds(sideSlot)
}
editorWin = null;
var isIE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)
    , puzzleZoom = 1
    , startTime = 0
    , personalTime = 0
    , timerTimeout = null;
document.oncontextmenu = new Function("return false");
var RightClick = 1;
navigator.userAgent.match(/Opera/gi) && (RightClick = 0),
    navigator.userAgent.match(/Safari/gi) && (RightClick = 0),
    navigator.userAgent.match(/MSIE/gi) || navigator.userAgent.match(/Mozilla/gi) || (RightClick = 0),
    navigator.userAgent.match(/Chrome/gi) && (RightClick = 1),
    (navigator.userAgent.match(/iPhone/gi) || navigator.userAgent.match(/iPad/gi) || navigator.userAgent.match(/Android/gi)) && (RightClick = 0),
    setTimeout(function () {
        var e = document.getElementById("bannerTop");
        e && e.parentNode.removeChild(e);
        var e = document.getElementById("bannerSide");
        e && e.parentNode.removeChild(e);
        var e = document.getElementById("bannerTopSpacer");
        e && (e.style.display = "block")
    }, 6e5);
var minZoom = .2
    , maxZoom = 5
    , cookieZoom = Get_Cookie("zoom");
"undefined" != typeof cookieZoom && (puzzleZoom = cookieZoom);
var states = []
    , stateIndex = -1;
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
        : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length
            , n = oe.type(e);
        return "function" !== n && !oe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function r(e, t, n) {
        if (oe.isFunction(t))
            return oe.grep(e, function (e, r) {
                return !!t.call(e, r, e) !== n
            });
        if (t.nodeType)
            return oe.grep(e, function (e) {
                return e === t !== n
            });
        if ("string" == typeof t) {
            if (ge.test(t))
                return oe.filter(t, e, n);
            t = oe.filter(t, e)
        }
        return oe.grep(e, function (e) {
            return Z.call(t, e) > -1 !== n
        })
    }
    function i(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;)
            ;
        return e
    }
    function o(e) {
        var t = {};
        return oe.each(e.match(we) || [], function (e, n) {
            t[n] = !0
        }),
            t
    }
    function a() {
        Y.removeEventListener("DOMContentLoaded", a),
            e.removeEventListener("load", a),
            oe.ready()
    }
    function s() {
        this.expando = oe.expando + s.uid++
    }
    function c(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Oe, "-$&").toLowerCase(),
                n = e.getAttribute(r),
                "string" == typeof n) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Ae.test(n) ? oe.parseJSON(n) : n)
                } catch (e) { }
                Ie.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    function u(e, t, n, r) {
        var i, o = 1, a = 20, s = r ? function () {
            return r.cur()
        }
            : function () {
                return oe.css(e, t, "")
            }
            , c = s(), u = n && n[3] || (oe.cssNumber[t] ? "" : "px"), d = (oe.cssNumber[t] || "px" !== u && +c) && ke.exec(oe.css(e, t));
        if (d && d[3] !== u) {
            u = u || d[3],
                n = n || [],
                d = +c || 1;
            do
                o = o || ".5",
                    d /= o,
                    oe.style(e, t, d + u);
            while (o !== (o = s() / c) && 1 !== o && --a)
        }
        return n && (d = +d || +c || 0,
            i = n[1] ? d + (n[1] + 1) * n[2] : +n[2],
            r && (r.unit = u,
                r.start = d,
                r.end = i)),
            i
    }
    function d(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && oe.nodeName(e, t) ? oe.merge([e], n) : n
    }
    function l(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            Ee.set(e[n], "globalEval", !t || Ee.get(t[n], "globalEval"))
    }
    function f(e, t, n, r, i) {
        for (var o, a, s, c, u, f, p = t.createDocumentFragment(), h = [], g = 0, m = e.length; m > g; g++)
            if (o = e[g],
                o || 0 === o)
                if ("object" === oe.type(o))
                    oe.merge(h, o.nodeType ? [o] : o);
                else if (Be.test(o)) {
                    for (a = a || p.appendChild(t.createElement("div")),
                        s = (Ue.exec(o) || ["", ""])[1].toLowerCase(),
                        c = Pe[s] || Pe._default,
                        a.innerHTML = c[1] + oe.htmlPrefilter(o) + c[2],
                        f = c[0]; f--;)
                        a = a.lastChild;
                    oe.merge(h, a.childNodes),
                        a = p.firstChild,
                        a.textContent = ""
                } else
                    h.push(t.createTextNode(o));
        for (p.textContent = "",
            g = 0; o = h[g++];)
            if (r && oe.inArray(o, r) > -1)
                i && i.push(o);
            else if (u = oe.contains(o.ownerDocument, o),
                a = d(p.appendChild(o), "script"),
                u && l(a),
                n)
                for (f = 0; o = a[f++];)
                    Re.test(o.type || "") && n.push(o);
        return p
    }
    function p() {
        return !0
    }
    function h() {
        return !1
    }
    function g() {
        try {
            return Y.activeElement
        } catch (e) { }
    }
    function m(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n,
                n = void 0);
            for (s in t)
                m(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
            r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
                r = void 0) : (i = r,
                    r = n,
                    n = void 0)),
            i === !1)
            i = h;
        else if (!i)
            return e;
        return 1 === o && (a = i,
            i = function (e) {
                return oe().off(e),
                    a.apply(this, arguments)
            }
            ,
            i.guid = a.guid || (a.guid = oe.guid++)),
            e.each(function () {
                oe.event.add(this, t, i, r, n)
            })
    }
    function v(e, t) {
        return oe.nodeName(e, "table") && oe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function b(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
            e
    }
    function y(e) {
        var t = He.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
            e
    }
    function S(e, t) {
        var n, r, i, o, a, s, c, u;
        if (1 === t.nodeType) {
            if (Ee.hasData(e) && (o = Ee.access(e),
                a = Ee.set(t, o),
                u = o.events)) {
                delete a.handle,
                    a.events = {};
                for (i in u)
                    for (n = 0,
                        r = u[i].length; r > n; n++)
                        oe.event.add(t, i, u[i][n])
            }
            Ie.hasData(e) && (s = Ie.access(e),
                c = oe.extend({}, s),
                Ie.set(t, c))
        }
    }
    function w(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ne.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }
    function C(e, t, n, r) {
        t = X.apply([], t);
        var i, o, a, s, c, u, l = 0, p = e.length, h = p - 1, g = t[0], m = oe.isFunction(g);
        if (m || p > 1 && "string" == typeof g && !re.checkClone && Fe.test(g))
            return e.each(function (i) {
                var o = e.eq(i);
                m && (t[0] = g.call(this, i, o.html())),
                    C(o, t, n, r)
            });
        if (p && (i = f(t, e[0].ownerDocument, !1, e, r),
            o = i.firstChild,
            1 === i.childNodes.length && (i = o),
            o || r)) {
            for (a = oe.map(d(i, "script"), b),
                s = a.length; p > l; l++)
                c = i,
                    l !== h && (c = oe.clone(c, !0, !0),
                        s && oe.merge(a, d(c, "script"))),
                    n.call(e[l], c, l);
            if (s)
                for (u = a[a.length - 1].ownerDocument,
                    oe.map(a, y),
                    l = 0; s > l; l++)
                    c = a[l],
                        Re.test(c.type || "") && !Ee.access(c, "globalEval") && oe.contains(u, c) && (c.src ? oe._evalUrl && oe._evalUrl(c.src) : oe.globalEval(c.textContent.replace(We, "")))
        }
        return e
    }
    function T(e, t, n) {
        for (var r, i = t ? oe.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || oe.cleanData(d(r)),
                r.parentNode && (n && oe.contains(r.ownerDocument, r) && l(d(r, "script")),
                    r.parentNode.removeChild(r));
        return e
    }
    function x(e, t) {
        var n = oe(t.createElement(e)).appendTo(t.body)
            , r = oe.css(n[0], "display");
        return n.detach(),
            r
    }
    function E(e) {
        var t = Y
            , n = Ve[e];
        return n || (n = x(e, t),
            "none" !== n && n || (Ge = (Ge || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
                t = Ge[0].contentDocument,
                t.write(),
                t.close(),
                n = x(e, t),
                Ge.detach()),
            Ve[e] = n),
            n
    }
    function I(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || Ke(e),
            a = n ? n.getPropertyValue(t) || n[t] : void 0,
            "" !== a && void 0 !== a || oe.contains(e.ownerDocument, e) || (a = oe.style(e, t)),
            n && !re.pixelMarginRight() && Ye.test(a) && Je.test(t) && (r = s.width,
                i = s.minWidth,
                o = s.maxWidth,
                s.minWidth = s.maxWidth = s.width = a,
                a = n.width,
                s.width = r,
                s.minWidth = i,
                s.maxWidth = o),
            void 0 !== a ? a + "" : a
    }
    function A(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    function O(e) {
        if (e in rt)
            return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)
            if (e = nt[n] + t,
                e in rt)
                return e
    }
    function j(e, t, n) {
        var r = ke.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function k(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)
            "margin" === n && (a += oe.css(e, n + _e[o], !0, i)),
                r ? ("content" === n && (a -= oe.css(e, "padding" + _e[o], !0, i)),
                    "margin" !== n && (a -= oe.css(e, "border" + _e[o] + "Width", !0, i))) : (a += oe.css(e, "padding" + _e[o], !0, i),
                        "padding" !== n && (a += oe.css(e, "border" + _e[o] + "Width", !0, i)));
        return a
    }
    function _(e, t, n) {
        var r = !0
            , i = "width" === t ? e.offsetWidth : e.offsetHeight
            , o = Ke(e)
            , a = "border-box" === oe.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = I(e, t, o),
                (0 > i || null == i) && (i = e.style[t]),
                Ye.test(i))
                return i;
            r = a && (re.boxSizingReliable() || i === e.style[t]),
                i = parseFloat(i) || 0
        }
        return i + k(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }
    function D(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)
            r = e[a],
                r.style && (o[a] = Ee.get(r, "olddisplay"),
                    n = r.style.display,
                    t ? (o[a] || "none" !== n || (r.style.display = ""),
                        "" === r.style.display && De(r) && (o[a] = Ee.access(r, "olddisplay", E(r.nodeName)))) : (i = De(r),
                            "none" === n && i || Ee.set(r, "olddisplay", i ? n : oe.css(r, "display"))));
        for (a = 0; s > a; a++)
            r = e[a],
                r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }
    function N(e, t, n, r, i) {
        return new N.prototype.init(e, t, n, r, i)
    }
    function U() {
        return e.setTimeout(function () {
            it = void 0
        }),
            it = oe.now()
    }
    function R(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)
            n = _e[r],
                i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
            i
    }
    function P(e, t, n) {
        for (var r, i = (q.tweeners[t] || []).concat(q.tweeners["*"]), o = 0, a = i.length; a > o; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function B(e, t, n) {
        var r, i, o, a, s, c, u, d, l = this, f = {}, p = e.style, h = e.nodeType && De(e), g = Ee.get(e, "fxshow");
        n.queue || (s = oe._queueHooks(e, "fx"),
            null == s.unqueued && (s.unqueued = 0,
                c = s.empty.fire,
                s.empty.fire = function () {
                    s.unqueued || c()
                }
            ),
            s.unqueued++,
            l.always(function () {
                l.always(function () {
                    s.unqueued--,
                        oe.queue(e, "fx").length || s.empty.fire()
                })
            })),
            1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                u = oe.css(e, "display"),
                d = "none" === u ? Ee.get(e, "olddisplay") || E(e.nodeName) : u,
                "inline" === d && "none" === oe.css(e, "float") && (p.display = "inline-block")),
            n.overflow && (p.overflow = "hidden",
                l.always(function () {
                    p.overflow = n.overflow[0],
                        p.overflowX = n.overflow[1],
                        p.overflowY = n.overflow[2]
                }));
        for (r in t)
            if (i = t[r],
                at.exec(i)) {
                if (delete t[r],
                    o = o || "toggle" === i,
                    i === (h ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r])
                        continue;
                    h = !0
                }
                f[r] = g && g[r] || oe.style(e, r)
            } else
                u = void 0;
        if (oe.isEmptyObject(f))
            "inline" === ("none" === u ? E(e.nodeName) : u) && (p.display = u);
        else {
            g ? "hidden" in g && (h = g.hidden) : g = Ee.access(e, "fxshow", {}),
                o && (g.hidden = !h),
                h ? oe(e).show() : l.done(function () {
                    oe(e).hide()
                }),
                l.done(function () {
                    var t;
                    Ee.remove(e, "fxshow");
                    for (t in f)
                        oe.style(e, t, f[t])
                });
            for (r in f)
                a = P(h ? g[r] : 0, r, l),
                    r in g || (g[r] = a.start,
                        h && (a.end = a.start,
                            a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function M(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = oe.camelCase(n),
                i = t[r],
                o = e[n],
                oe.isArray(o) && (i = o[1],
                    o = e[n] = o[0]),
                n !== r && (e[r] = o,
                    delete e[n]),
                a = oe.cssHooks[r],
                a && "expand" in a) {
                o = a.expand(o),
                    delete e[r];
                for (n in o)
                    n in e || (e[n] = o[n],
                        t[n] = i)
            } else
                t[r] = i
    }
    function q(e, t, n) {
        var r, i, o = 0, a = q.prefilters.length, s = oe.Deferred().always(function () {
            delete c.elem
        }), c = function () {
            if (i)
                return !1;
            for (var t = it || U(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, c = u.tweens.length; c > a; a++)
                u.tweens[a].run(o);
            return s.notifyWith(e, [u, o, n]),
                1 > o && c ? n : (s.resolveWith(e, [u]),
                    !1)
        }, u = s.promise({
            elem: e,
            props: oe.extend({}, t),
            opts: oe.extend(!0, {
                specialEasing: {},
                easing: oe.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: it || U(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = oe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(r),
                    r
            },
            stop: function (t) {
                var n = 0
                    , r = t ? u.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; r > n; n++)
                    u.tweens[n].run(1);
                return t ? (s.notifyWith(e, [u, 1, 0]),
                    s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]),
                    this
            }
        }), d = u.props;
        for (M(d, u.opts.specialEasing); a > o; o++)
            if (r = q.prefilters[o].call(u, e, d, u.opts))
                return oe.isFunction(r.stop) && (oe._queueHooks(u.elem, u.opts.queue).stop = oe.proxy(r.stop, r)),
                    r;
        return oe.map(d, P, u),
            oe.isFunction(u.opts.start) && u.opts.start.call(e, u),
            oe.fx.timer(oe.extend(c, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })),
            u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    function z(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function L(e) {
        return function (t, n) {
            "string" != typeof t && (n = t,
                t = "*");
            var r, i = 0, o = t.toLowerCase().match(we) || [];
            if (oe.isFunction(n))
                for (; r = o[i++];)
                    "+" === r[0] ? (r = r.slice(1) || "*",
                        (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function $(e, t, n, r) {
        function i(s) {
            var c;
            return o[s] = !0,
                oe.each(e[s] || [], function (e, s) {
                    var u = s(t, n, r);
                    return "string" != typeof u || a || o[u] ? a ? !(c = u) : void 0 : (t.dataTypes.unshift(u),
                        i(u),
                        !1)
                }),
                c
        }
        var o = {}
            , a = e === It;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function F(e, t) {
        var n, r, i = oe.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && oe.extend(!0, e, r),
            e
    }
    function H(e, t, n) {
        for (var r, i, o, a, s = e.contents, c = e.dataTypes; "*" === c[0];)
            c.shift(),
                void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    c.unshift(i);
                    break
                }
        if (c[0] in n)
            o = c[0];
        else {
            for (i in n) {
                if (!c[0] || e.converters[i + " " + c[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        return o ? (o !== c[0] && c.unshift(o),
            n[o]) : void 0
    }
    function W(e, t, n, r) {
        var i, o, a, s, c, u = {}, d = e.dataTypes.slice();
        if (d[1])
            for (a in e.converters)
                u[a.toLowerCase()] = e.converters[a];
        for (o = d.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                c = o,
                o = d.shift())
                if ("*" === o)
                    o = c;
                else if ("*" !== c && c !== o) {
                    if (a = u[c + " " + o] || u["* " + o],
                        !a)
                        for (i in u)
                            if (s = i.split(" "),
                                s[1] === o && (a = u[c + " " + s[0]] || u["* " + s[0]])) {
                                a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0],
                                    d.unshift(s[1]));
                                break
                            }
                    if (a !== !0)
                        if (a && e.throws)
                            t = a(t);
                        else
                            try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + c + " to " + o
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    function G(e, t, n, r) {
        var i;
        if (oe.isArray(t))
            oe.each(t, function (t, i) {
                n || kt.test(e) ? r(e, i) : G(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            });
        else if (n || "object" !== oe.type(t))
            r(e, t);
        else
            for (i in t)
                G(e + "[" + i + "]", t[i], n, r)
    }
    function V(e) {
        return oe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var J = []
        , Y = e.document
        , K = J.slice
        , X = J.concat
        , Q = J.push
        , Z = J.indexOf
        , ee = {}
        , te = ee.toString
        , ne = ee.hasOwnProperty
        , re = {}
        , ie = "2.2.4"
        , oe = function (e, t) {
            return new oe.fn.init(e, t)
        }
        , ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
        , se = /^-ms-/
        , ce = /-([\da-z])/gi
        , ue = function (e, t) {
            return t.toUpperCase()
        };
    oe.fn = oe.prototype = {
        jquery: ie,
        constructor: oe,
        selector: "",
        length: 0,
        toArray: function () {
            return K.call(this)
        },
        get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : K.call(this)
        },
        pushStack: function (e) {
            var t = oe.merge(this.constructor(), e);
            return t.prevObject = this,
                t.context = this.context,
                t
        },
        each: function (e) {
            return oe.each(this, e)
        },
        map: function (e) {
            return this.pushStack(oe.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function () {
            return this.pushStack(K.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length
                , n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor()
        },
        push: Q,
        sort: J.sort,
        splice: J.splice
    },
        oe.extend = oe.fn.extend = function () {
            var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, c = arguments.length, u = !1;
            for ("boolean" == typeof a && (u = a,
                a = arguments[s] || {},
                s++),
                "object" == typeof a || oe.isFunction(a) || (a = {}),
                s === c && (a = this,
                    s--); c > s; s++)
                if (null != (e = arguments[s]))
                    for (t in e)
                        n = a[t],
                            r = e[t],
                            a !== r && (u && r && (oe.isPlainObject(r) || (i = oe.isArray(r))) ? (i ? (i = !1,
                                o = n && oe.isArray(n) ? n : []) : o = n && oe.isPlainObject(n) ? n : {},
                                a[t] = oe.extend(u, o, r)) : void 0 !== r && (a[t] = r));
            return a
        }
        ,
        oe.extend({
            expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
                throw new Error(e)
            },
            noop: function () { },
            isFunction: function (e) {
                return "function" === oe.type(e)
            },
            isArray: Array.isArray,
            isWindow: function (e) {
                return null != e && e === e.window
            },
            isNumeric: function (e) {
                var t = e && e.toString();
                return !oe.isArray(e) && t - parseFloat(t) + 1 >= 0
            },
            isPlainObject: function (e) {
                var t;
                if ("object" !== oe.type(e) || e.nodeType || oe.isWindow(e))
                    return !1;
                if (e.constructor && !ne.call(e, "constructor") && !ne.call(e.constructor.prototype || {}, "isPrototypeOf"))
                    return !1;
                for (t in e)
                    ;
                return void 0 === t || ne.call(e, t)
            },
            isEmptyObject: function (e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[te.call(e)] || "object" : typeof e
            },
            globalEval: function (e) {
                var t, n = eval;
                e = oe.trim(e),
                    e && (1 === e.indexOf("use strict") ? (t = Y.createElement("script"),
                        t.text = e,
                        Y.head.appendChild(t).parentNode.removeChild(t)) : n(e))
            },
            camelCase: function (e) {
                return e.replace(se, "ms-").replace(ce, ue)
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function (e, t) {
                var r, i = 0;
                if (n(e))
                    for (r = e.length; r > i && t.call(e[i], i, e[i]) !== !1; i++)
                        ;
                else
                    for (i in e)
                        if (t.call(e[i], i, e[i]) === !1)
                            break;
                return e
            },
            trim: function (e) {
                return null == e ? "" : (e + "").replace(ae, "")
            },
            makeArray: function (e, t) {
                var r = t || [];
                return null != e && (n(Object(e)) ? oe.merge(r, "string" == typeof e ? [e] : e) : Q.call(r, e)),
                    r
            },
            inArray: function (e, t, n) {
                return null == t ? -1 : Z.call(t, e, n)
            },
            merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; n > r; r++)
                    e[i++] = t[r];
                return e.length = i,
                    e
            },
            grep: function (e, t, n) {
                for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)
                    r = !t(e[o], o),
                        r !== s && i.push(e[o]);
                return i
            },
            map: function (e, t, r) {
                var i, o, a = 0, s = [];
                if (n(e))
                    for (i = e.length; i > a; a++)
                        o = t(e[a], a, r),
                            null != o && s.push(o);
                else
                    for (a in e)
                        o = t(e[a], a, r),
                            null != o && s.push(o);
                return X.apply([], s)
            },
            guid: 1,
            proxy: function (e, t) {
                var n, r, i;
                return "string" == typeof t && (n = e[t],
                    t = e,
                    e = n),
                    oe.isFunction(e) ? (r = K.call(arguments, 2),
                        i = function () {
                            return e.apply(t || this, r.concat(K.call(arguments)))
                        }
                        ,
                        i.guid = e.guid = e.guid || oe.guid++,
                        i) : void 0
            },
            now: Date.now,
            support: re
        }),
        "function" == typeof Symbol && (oe.fn[Symbol.iterator] = J[Symbol.iterator]),
        oe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
            ee["[object " + t + "]"] = t.toLowerCase()
        });
    var de = function (e) {
        function t(e, t, n, r) {
            var i, o, a, s, c, u, l, p, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
            if (n = n || [],
                "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)
                return n;
            if (!r && ((t ? t.ownerDocument || t : z) !== D && _(t),
                t = t || D,
                U)) {
                if (11 !== g && (u = ve.exec(e)))
                    if (i = u[1]) {
                        if (9 === g) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                    n
                        } else if (h && (a = h.getElementById(i)) && M(t, a) && a.id === i)
                            return n.push(a),
                                n
                    } else {
                        if (u[2])
                            return Q.apply(n, t.getElementsByTagName(e)),
                                n;
                        if ((i = u[3]) && w.getElementsByClassName && t.getElementsByClassName)
                            return Q.apply(n, t.getElementsByClassName(i)),
                                n
                    }
                if (w.qsa && !W[e + " "] && (!R || !R.test(e))) {
                    if (1 !== g)
                        h = t,
                            p = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(ye, "\\$&") : t.setAttribute("id", s = q),
                            l = E(e),
                            o = l.length,
                            c = fe.test(s) ? "#" + s : "[id='" + s + "']"; o--;)
                            l[o] = c + " " + f(l[o]);
                        p = l.join(","),
                            h = be.test(e) && d(t.parentNode) || t
                    }
                    if (p)
                        try {
                            return Q.apply(n, h.querySelectorAll(p)),
                                n
                        } catch (e) { } finally {
                            s === q && t.removeAttribute("id")
                        }
                }
            }
            return A(e.replace(se, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > C.cacheLength && delete e[t.shift()],
                    e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[q] = !0,
                e
        }
        function i(e) {
            var t = D.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                    t = null
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = n.length; r--;)
                C.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e
                , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function c(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function u(e) {
            return r(function (t) {
                return t = +t,
                    r(function (n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;)
                            n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    })
            })
        }
        function d(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function l() { }
        function f(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)
                r += e[t].value;
            return r
        }
        function p(e, t, n) {
            var r = t.dir
                , i = n && "parentNode" === r
                , o = $++;
            return t.first ? function (t, n, o) {
                for (; t = t[r];)
                    if (1 === t.nodeType || i)
                        return e(t, n, o)
            }
                : function (t, n, a) {
                    var s, c, u, d = [L, o];
                    if (a) {
                        for (; t = t[r];)
                            if ((1 === t.nodeType || i) && e(t, n, a))
                                return !0
                    } else
                        for (; t = t[r];)
                            if (1 === t.nodeType || i) {
                                if (u = t[q] || (t[q] = {}),
                                    c = u[t.uniqueID] || (u[t.uniqueID] = {}),
                                    (s = c[r]) && s[0] === L && s[1] === o)
                                    return d[2] = s[2];
                                if (c[r] = d,
                                    d[2] = e(t, n, a))
                                    return !0
                            }
                }
        }
        function h(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
                : e[0]
        }
        function g(e, n, r) {
            for (var i = 0, o = n.length; o > i; i++)
                t(e, n[i], r);
            return r
        }
        function m(e, t, n, r, i) {
            for (var o, a = [], s = 0, c = e.length, u = null != t; c > s; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                    u && t.push(s)));
            return a
        }
        function v(e, t, n, i, o, a) {
            return i && !i[q] && (i = v(i)),
                o && !o[q] && (o = v(o, a)),
                r(function (r, a, s, c) {
                    var u, d, l, f = [], p = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []), b = !e || !r && t ? v : m(v, f, e, s, c), y = n ? o || (r ? e : h || i) ? [] : a : b;
                    if (n && n(b, y, s, c),
                        i)
                        for (u = m(y, p),
                            i(u, [], s, c),
                            d = u.length; d--;)
                            (l = u[d]) && (y[p[d]] = !(b[p[d]] = l));
                    if (r) {
                        if (o || e) {
                            if (o) {
                                for (u = [],
                                    d = y.length; d--;)
                                    (l = y[d]) && u.push(b[d] = l);
                                o(null, y = [], u, c)
                            }
                            for (d = y.length; d--;)
                                (l = y[d]) && (u = o ? ee(r, l) : f[d]) > -1 && (r[u] = !(a[u] = l))
                        }
                    } else
                        y = m(y === a ? y.splice(h, y.length) : y),
                            o ? o(null, a, y, c) : Q.apply(a, y)
                })
        }
        function b(e) {
            for (var t, n, r, i = e.length, o = C.relative[e[0].type], a = o || C.relative[" "], s = o ? 1 : 0, c = p(function (e) {
                return e === t
            }, a, !0), u = p(function (e) {
                return ee(t, e) > -1
            }, a, !0), d = [function (e, n, r) {
                var i = !o && (r || n !== O) || ((t = n).nodeType ? c(e, n, r) : u(e, n, r));
                return t = null,
                    i
            }
            ]; i > s; s++)
                if (n = C.relative[e[s].type])
                    d = [p(h(d), n)];
                else {
                    if (n = C.filter[e[s].type].apply(null, e[s].matches),
                        n[q]) {
                        for (r = ++s; i > r && !C.relative[e[r].type]; r++)
                            ;
                        return v(s > 1 && h(d), s > 1 && f(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, r > s && b(e.slice(s, r)), i > r && b(e = e.slice(r)), i > r && f(e))
                    }
                    d.push(n)
                }
            return h(d)
        }
        function y(e, n) {
            var i = n.length > 0
                , o = e.length > 0
                , a = function (r, a, s, c, u) {
                    var d, l, f, p = 0, h = "0", g = r && [], v = [], b = O, y = r || o && C.find.TAG("*", u), S = L += null == b ? 1 : Math.random() || .1, w = y.length;
                    for (u && (O = a === D || a || u); h !== w && null != (d = y[h]); h++) {
                        if (o && d) {
                            for (l = 0,
                                a || d.ownerDocument === D || (_(d),
                                    s = !U); f = e[l++];)
                                if (f(d, a || D, s)) {
                                    c.push(d);
                                    break
                                }
                            u && (L = S)
                        }
                        i && ((d = !f && d) && p--,
                            r && g.push(d))
                    }
                    if (p += h,
                        i && h !== p) {
                        for (l = 0; f = n[l++];)
                            f(g, v, a, s);
                        if (r) {
                            if (p > 0)
                                for (; h--;)
                                    g[h] || v[h] || (v[h] = K.call(c));
                            v = m(v)
                        }
                        Q.apply(c, v),
                            u && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(c)
                    }
                    return u && (L = S,
                        O = b),
                        g
                };
            return i ? r(a) : a
        }
        var S, w, C, T, x, E, I, A, O, j, k, _, D, N, U, R, P, B, M, q = "sizzle" + 1 * new Date, z = e.document, L = 0, $ = 0, F = n(), H = n(), W = n(), G = function (e, t) {
            return e === t && (k = !0),
                0
        }, V = 1 << 31, J = {}.hasOwnProperty, Y = [], K = Y.pop, X = Y.push, Q = Y.push, Z = Y.slice, ee = function (e, t) {
            for (var n = 0, r = e.length; r > n; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+", "g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), ce = new RegExp("^" + ne + "*," + ne + "*"), ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), le = new RegExp(oe), fe = new RegExp("^" + re + "$"), pe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re + "|[*])"),
            ATTR: new RegExp("^" + ie),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, me = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, ye = /'|\\/g, Se = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), we = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }, Ce = function () {
            _()
        };
        try {
            Q.apply(Y = Z.call(z.childNodes), z.childNodes),
                Y[z.childNodes.length].nodeType
        } catch (e) {
            Q = {
                apply: Y.length ? function (e, t) {
                    X.apply(e, Z.call(t))
                }
                    : function (e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];)
                            ;
                        e.length = n - 1
                    }
            }
        }
        w = t.support = {},
            x = t.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }
            ,
            _ = t.setDocument = function (e) {
                var t, n, r = e ? e.ownerDocument || e : z;
                return r !== D && 9 === r.nodeType && r.documentElement ? (D = r,
                    N = D.documentElement,
                    U = !x(D),
                    (n = D.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)),
                    w.attributes = i(function (e) {
                        return e.className = "i",
                            !e.getAttribute("className")
                    }),
                    w.getElementsByTagName = i(function (e) {
                        return e.appendChild(D.createComment("")),
                            !e.getElementsByTagName("*").length
                    }),
                    w.getElementsByClassName = me.test(D.getElementsByClassName),
                    w.getById = i(function (e) {
                        return N.appendChild(e).id = q,
                            !D.getElementsByName || !D.getElementsByName(q).length
                    }),
                    w.getById ? (C.find.ID = function (e, t) {
                        if ("undefined" != typeof t.getElementById && U) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }
                        ,
                        C.filter.ID = function (e) {
                            var t = e.replace(Se, we);
                            return function (e) {
                                return e.getAttribute("id") === t
                            }
                        }
                    ) : (delete C.find.ID,
                        C.filter.ID = function (e) {
                            var t = e.replace(Se, we);
                            return function (e) {
                                var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }
                    ),
                    C.find.TAG = w.getElementsByTagName ? function (e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                    }
                        : function (e, t) {
                            var n, r = [], i = 0, o = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = o[i++];)
                                    1 === n.nodeType && r.push(n);
                                return r
                            }
                            return o
                        }
                    ,
                    C.find.CLASS = w.getElementsByClassName && function (e, t) {
                        return "undefined" != typeof t.getElementsByClassName && U ? t.getElementsByClassName(e) : void 0
                    }
                    ,
                    P = [],
                    R = [],
                    (w.qsa = me.test(D.querySelectorAll)) && (i(function (e) {
                        N.appendChild(e).innerHTML = "<a id='" + q + "'></a><select id='" + q + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                            e.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + ne + "*(?:''|\"\")"),
                            e.querySelectorAll("[selected]").length || R.push("\\[" + ne + "*(?:value|" + te + ")"),
                            e.querySelectorAll("[id~=" + q + "-]").length || R.push("~="),
                            e.querySelectorAll(":checked").length || R.push(":checked"),
                            e.querySelectorAll("a#" + q + "+*").length || R.push(".#.+[+~]")
                    }),
                        i(function (e) {
                            var t = D.createElement("input");
                            t.setAttribute("type", "hidden"),
                                e.appendChild(t).setAttribute("name", "D"),
                                e.querySelectorAll("[name=d]").length && R.push("name" + ne + "*[*^$|!~]?="),
                                e.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"),
                                e.querySelectorAll("*,:x"),
                                R.push(",.*:")
                        })),
                    (w.matchesSelector = me.test(B = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && i(function (e) {
                        w.disconnectedMatch = B.call(e, "div"),
                            B.call(e, "[s!='']:x"),
                            P.push("!=", oe)
                    }),
                    R = R.length && new RegExp(R.join("|")),
                    P = P.length && new RegExp(P.join("|")),
                    t = me.test(N.compareDocumentPosition),
                    M = t || me.test(N.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e
                            , r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    }
                        : function (e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e)
                                        return !0;
                            return !1
                        }
                    ,
                    G = t ? function (e, t) {
                        if (e === t)
                            return k = !0,
                                0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                            1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === D || e.ownerDocument === z && M(z, e) ? -1 : t === D || t.ownerDocument === z && M(z, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1)
                    }
                        : function (e, t) {
                            if (e === t)
                                return k = !0,
                                    0;
                            var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], c = [t];
                            if (!i || !o)
                                return e === D ? -1 : t === D ? 1 : i ? -1 : o ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                            if (i === o)
                                return a(e, t);
                            for (n = e; n = n.parentNode;)
                                s.unshift(n);
                            for (n = t; n = n.parentNode;)
                                c.unshift(n);
                            for (; s[r] === c[r];)
                                r++;
                            return r ? a(s[r], c[r]) : s[r] === z ? -1 : c[r] === z ? 1 : 0
                        }
                    ,
                    D) : D
            }
            ,
            t.matches = function (e, n) {
                return t(e, null, null, n)
            }
            ,
            t.matchesSelector = function (e, n) {
                if ((e.ownerDocument || e) !== D && _(e),
                    n = n.replace(de, "='$1']"),
                    w.matchesSelector && U && !W[n + " "] && (!P || !P.test(n)) && (!R || !R.test(n)))
                    try {
                        var r = B.call(e, n);
                        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                            return r
                    } catch (e) { }
                return t(n, D, null, [e]).length > 0
            }
            ,
            t.contains = function (e, t) {
                return (e.ownerDocument || e) !== D && _(e),
                    M(e, t)
            }
            ,
            t.attr = function (e, t) {
                (e.ownerDocument || e) !== D && _(e);
                var n = C.attrHandle[t.toLowerCase()]
                    , r = n && J.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !U) : void 0;
                return void 0 !== r ? r : w.attributes || !U ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }
            ,
            t.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }
            ,
            t.uniqueSort = function (e) {
                var t, n = [], r = 0, i = 0;
                if (k = !w.detectDuplicates,
                    j = !w.sortStable && e.slice(0),
                    e.sort(G),
                    k) {
                    for (; t = e[i++];)
                        t === e[i] && (r = n.push(i));
                    for (; r--;)
                        e.splice(n[r], 1)
                }
                return j = null,
                    e
            }
            ,
            T = t.getText = function (e) {
                var t, n = "", r = 0, i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += T(e)
                    } else if (3 === i || 4 === i)
                        return e.nodeValue
                } else
                    for (; t = e[r++];)
                        n += T(t);
                return n
            }
            ,
            C = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: pe,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace(Se, we),
                            e[3] = (e[3] || e[4] || e[5] || "").replace(Se, we),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                            e.slice(0, 4)
                    },
                    CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                                e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                            e
                    },
                    PSEUDO: function (e) {
                        var t, n = !e[6] && e[2];
                        return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && le.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                            e[2] = n.slice(0, t)),
                            e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(Se, we).toLowerCase();
                        return "*" === e ? function () {
                            return !0
                        }
                            : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                    },
                    CLASS: function (e) {
                        var t = F[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && F(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function (e, n, r) {
                        return function (i) {
                            var o = t.attr(i, e);
                            return null == o ? "!=" === n : !n || (o += "",
                                "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                        }
                    },
                    CHILD: function (e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3)
                            , a = "last" !== e.slice(-4)
                            , s = "of-type" === t;
                        return 1 === r && 0 === i ? function (e) {
                            return !!e.parentNode
                        }
                            : function (t, n, c) {
                                var u, d, l, f, p, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, v = s && t.nodeName.toLowerCase(), b = !c && !s, y = !1;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (f = t; f = f[g];)
                                                if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)
                                                    return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild],
                                        a && b) {
                                        for (f = m,
                                            l = f[q] || (f[q] = {}),
                                            d = l[f.uniqueID] || (l[f.uniqueID] = {}),
                                            u = d[e] || [],
                                            p = u[0] === L && u[1],
                                            y = p && u[2],
                                            f = p && m.childNodes[p]; f = ++p && f && f[g] || (y = p = 0) || h.pop();)
                                            if (1 === f.nodeType && ++y && f === t) {
                                                d[e] = [L, p, y];
                                                break
                                            }
                                    } else if (b && (f = t,
                                        l = f[q] || (f[q] = {}),
                                        d = l[f.uniqueID] || (l[f.uniqueID] = {}),
                                        u = d[e] || [],
                                        p = u[0] === L && u[1],
                                        y = p),
                                        y === !1)
                                        for (; (f = ++p && f && f[g] || (y = p = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++y || (b && (l = f[q] || (f[q] = {}),
                                            d = l[f.uniqueID] || (l[f.uniqueID] = {}),
                                            d[e] = [L, y]),
                                            f !== t));)
                                            ;
                                    return y -= i,
                                        y === r || y % r === 0 && y / r >= 0
                                }
                            }
                    },
                    PSEUDO: function (e, n) {
                        var i, o = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[q] ? o(n) : o.length > 1 ? (i = [e, e, "", n],
                            C.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                                for (var r, i = o(e, n), a = i.length; a--;)
                                    r = ee(e, i[a]),
                                        e[r] = !(t[r] = i[a])
                            }) : function (e) {
                                return o(e, 0, i)
                            }
                        ) : o
                    }
                },
                pseudos: {
                    not: r(function (e) {
                        var t = []
                            , n = []
                            , i = I(e.replace(se, "$1"));
                        return i[q] ? r(function (e, t, n, r) {
                            for (var o, a = i(e, null, r, []), s = e.length; s--;)
                                (o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function (e, r, o) {
                            return t[0] = e,
                                i(t, null, o, n),
                                t[0] = null,
                                !n.pop()
                        }
                    }),
                    has: r(function (e) {
                        return function (n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: r(function (e) {
                        return e = e.replace(Se, we),
                            function (t) {
                                return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                            }
                    }),
                    lang: r(function (e) {
                        return fe.test(e || "") || t.error("unsupported lang: " + e),
                            e = e.replace(Se, we).toLowerCase(),
                            function (t) {
                                var n;
                                do
                                    if (n = U ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                        return n = n.toLowerCase(),
                                            n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function (e) {
                        return e === N
                    },
                    focus: function (e) {
                        return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function (e) {
                        return e.disabled === !1
                    },
                    disabled: function (e) {
                        return e.disabled === !0
                    },
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex,
                            e.selected === !0
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function (e) {
                        return !C.pseudos.empty(e)
                    },
                    header: function (e) {
                        return ge.test(e.nodeName)
                    },
                    input: function (e) {
                        return he.test(e.nodeName)
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: u(function () {
                        return [0]
                    }),
                    last: u(function (e, t) {
                        return [t - 1]
                    }),
                    eq: u(function (e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: u(function (e, t) {
                        for (var n = 0; t > n; n += 2)
                            e.push(n);
                        return e
                    }),
                    odd: u(function (e, t) {
                        for (var n = 1; t > n; n += 2)
                            e.push(n);
                        return e
                    }),
                    lt: u(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0;)
                            e.push(r);
                        return e
                    }),
                    gt: u(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t;)
                            e.push(r);
                        return e
                    })
                }
            },
            C.pseudos.nth = C.pseudos.eq;
        for (S in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            C.pseudos[S] = s(S);
        for (S in {
            submit: !0,
            reset: !0
        })
            C.pseudos[S] = c(S);
        return l.prototype = C.filters = C.pseudos,
            C.setFilters = new l,
            E = t.tokenize = function (e, n) {
                var r, i, o, a, s, c, u, d = H[e + " "];
                if (d)
                    return n ? 0 : d.slice(0);
                for (s = e,
                    c = [],
                    u = C.preFilter; s;) {
                    r && !(i = ce.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                        c.push(o = [])),
                        r = !1,
                        (i = ue.exec(s)) && (r = i.shift(),
                            o.push({
                                value: r,
                                type: i[0].replace(se, " ")
                            }),
                            s = s.slice(r.length));
                    for (a in C.filter)
                        !(i = pe[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(),
                            o.push({
                                value: r,
                                type: a,
                                matches: i
                            }),
                            s = s.slice(r.length));
                    if (!r)
                        break
                }
                return n ? s.length : s ? t.error(e) : H(e, c).slice(0)
            }
            ,
            I = t.compile = function (e, t) {
                var n, r = [], i = [], o = W[e + " "];
                if (!o) {
                    for (t || (t = E(e)),
                        n = t.length; n--;)
                        o = b(t[n]),
                            o[q] ? r.push(o) : i.push(o);
                    o = W(e, y(i, r)),
                        o.selector = e
                }
                return o
            }
            ,
            A = t.select = function (e, t, n, r) {
                var i, o, a, s, c, u = "function" == typeof e && e, l = !r && E(e = u.selector || e);
                if (n = n || [],
                    1 === l.length) {
                    if (o = l[0] = l[0].slice(0),
                        o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && U && C.relative[o[1].type]) {
                        if (t = (C.find.ID(a.matches[0].replace(Se, we), t) || [])[0],
                            !t)
                            return n;
                        u && (t = t.parentNode),
                            e = e.slice(o.shift().value.length)
                    }
                    for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                        !C.relative[s = a.type]);)
                        if ((c = C.find[s]) && (r = c(a.matches[0].replace(Se, we), be.test(o[0].type) && d(t.parentNode) || t))) {
                            if (o.splice(i, 1),
                                e = r.length && f(o),
                                !e)
                                return Q.apply(n, r),
                                    n;
                            break
                        }
                }
                return (u || I(e, l))(r, t, !U, n, !t || be.test(e) && d(t.parentNode) || t),
                    n
            }
            ,
            w.sortStable = q.split("").sort(G).join("") === q,
            w.detectDuplicates = !!k,
            _(),
            w.sortDetached = i(function (e) {
                return 1 & e.compareDocumentPosition(D.createElement("div"))
            }),
            i(function (e) {
                return e.innerHTML = "<a href='#'></a>",
                    "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }),
            w.attributes && i(function (e) {
                return e.innerHTML = "<input/>",
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
            }) || o("value", function (e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }),
            i(function (e) {
                return null == e.getAttribute("disabled")
            }) || o(te, function (e, t, n) {
                var r;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }),
            t
    }(e);
    oe.find = de,
        oe.expr = de.selectors,
        oe.expr[":"] = oe.expr.pseudos,
        oe.uniqueSort = oe.unique = de.uniqueSort,
        oe.text = de.getText,
        oe.isXMLDoc = de.isXML,
        oe.contains = de.contains;
    var le = function (e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (i && oe(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
        , fe = function (e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        }
        , pe = oe.expr.match.needsContext
        , he = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
        , ge = /^.[^:#\[\.,]*$/;
    oe.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === r.nodeType ? oe.find.matchesSelector(r, e) ? [r] : [] : oe.find.matches(e, oe.grep(t, function (e) {
                return 1 === e.nodeType
            }))
    }
        ,
        oe.fn.extend({
            find: function (e) {
                var t, n = this.length, r = [], i = this;
                if ("string" != typeof e)
                    return this.pushStack(oe(e).filter(function () {
                        for (t = 0; n > t; t++)
                            if (oe.contains(i[t], this))
                                return !0
                    }));
                for (t = 0; n > t; t++)
                    oe.find(e, i[t], r);
                return r = this.pushStack(n > 1 ? oe.unique(r) : r),
                    r.selector = this.selector ? this.selector + " " + e : e,
                    r
            },
            filter: function (e) {
                return this.pushStack(r(this, e || [], !1))
            },
            not: function (e) {
                return this.pushStack(r(this, e || [], !0))
            },
            is: function (e) {
                return !!r(this, "string" == typeof e && pe.test(e) ? oe(e) : e || [], !1).length
            }
        });
    var me, ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, be = oe.fn.init = function (e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || me,
            "string" == typeof e) {
            if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ve.exec(e),
                !r || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof oe ? t[0] : t,
                    oe.merge(this, oe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : Y, !0)),
                    he.test(r[1]) && oe.isPlainObject(t))
                    for (r in t)
                        oe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return i = Y.getElementById(r[2]),
                i && i.parentNode && (this.length = 1,
                    this[0] = i),
                this.context = Y,
                this.selector = e,
                this
        }
        return e.nodeType ? (this.context = this[0] = e,
            this.length = 1,
            this) : oe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(oe) : (void 0 !== e.selector && (this.selector = e.selector,
                this.context = e.context),
                oe.makeArray(e, this))
    }
        ;
    be.prototype = oe.fn,
        me = oe(Y);
    var ye = /^(?:parents|prev(?:Until|All))/
        , Se = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    oe.fn.extend({
        has: function (e) {
            var t = oe(e, this)
                , n = t.length;
            return this.filter(function () {
                for (var e = 0; n > e; e++)
                    if (oe.contains(this, t[e]))
                        return !0
            })
        },
        closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [], a = pe.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && oe.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? oe.uniqueSort(o) : o)
        },
        index: function (e) {
            return e ? "string" == typeof e ? Z.call(oe(e), this[0]) : Z.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            return this.pushStack(oe.uniqueSort(oe.merge(this.get(), oe(e, t))))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
        oe.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function (e) {
                return le(e, "parentNode")
            },
            parentsUntil: function (e, t, n) {
                return le(e, "parentNode", n)
            },
            next: function (e) {
                return i(e, "nextSibling")
            },
            prev: function (e) {
                return i(e, "previousSibling")
            },
            nextAll: function (e) {
                return le(e, "nextSibling")
            },
            prevAll: function (e) {
                return le(e, "previousSibling")
            },
            nextUntil: function (e, t, n) {
                return le(e, "nextSibling", n)
            },
            prevUntil: function (e, t, n) {
                return le(e, "previousSibling", n)
            },
            siblings: function (e) {
                return fe((e.parentNode || {}).firstChild, e)
            },
            children: function (e) {
                return fe(e.firstChild)
            },
            contents: function (e) {
                return e.contentDocument || oe.merge([], e.childNodes)
            }
        }, function (e, t) {
            oe.fn[e] = function (n, r) {
                var i = oe.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n),
                    r && "string" == typeof r && (i = oe.filter(r, i)),
                    this.length > 1 && (Se[e] || oe.uniqueSort(i),
                        ye.test(e) && i.reverse()),
                    this.pushStack(i)
            }
        });
    var we = /\S+/g;
    oe.Callbacks = function (e) {
        e = "string" == typeof e ? o(e) : oe.extend({}, e);
        var t, n, r, i, a = [], s = [], c = -1, u = function () {
            for (i = e.once,
                r = t = !0; s.length; c = -1)
                for (n = s.shift(); ++c < a.length;)
                    a[c].apply(n[0], n[1]) === !1 && e.stopOnFalse && (c = a.length,
                        n = !1);
            e.memory || (n = !1),
                t = !1,
                i && (a = n ? [] : "")
        }, d = {
            add: function () {
                return a && (n && !t && (c = a.length - 1,
                    s.push(n)),
                    function t(n) {
                        oe.each(n, function (n, r) {
                            oe.isFunction(r) ? e.unique && d.has(r) || a.push(r) : r && r.length && "string" !== oe.type(r) && t(r)
                        })
                    }(arguments),
                    n && !t && u()),
                    this
            },
            remove: function () {
                return oe.each(arguments, function (e, t) {
                    for (var n; (n = oe.inArray(t, a, n)) > -1;)
                        a.splice(n, 1),
                            c >= n && c--
                }),
                    this
            },
            has: function (e) {
                return e ? oe.inArray(e, a) > -1 : a.length > 0
            },
            empty: function () {
                return a && (a = []),
                    this
            },
            disable: function () {
                return i = s = [],
                    a = n = "",
                    this
            },
            disabled: function () {
                return !a
            },
            lock: function () {
                return i = s = [],
                    n || (a = n = ""),
                    this
            },
            locked: function () {
                return !!i
            },
            fireWith: function (e, n) {
                return i || (n = n || [],
                    n = [e, n.slice ? n.slice() : n],
                    s.push(n),
                    t || u()),
                    this
            },
            fire: function () {
                return d.fireWith(this, arguments),
                    this
            },
            fired: function () {
                return !!r
            }
        };
        return d
    }
        ,
        oe.extend({
            Deferred: function (e) {
                var t = [["resolve", "done", oe.Callbacks("once memory"), "resolved"], ["reject", "fail", oe.Callbacks("once memory"), "rejected"], ["notify", "progress", oe.Callbacks("memory")]]
                    , n = "pending"
                    , r = {
                        state: function () {
                            return n
                        },
                        always: function () {
                            return i.done(arguments).fail(arguments),
                                this
                        },
                        then: function () {
                            var e = arguments;
                            return oe.Deferred(function (n) {
                                oe.each(t, function (t, o) {
                                    var a = oe.isFunction(e[t]) && e[t];
                                    i[o[1]](function () {
                                        var e = a && a.apply(this, arguments);
                                        e && oe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                    })
                                }),
                                    e = null
                            }).promise()
                        },
                        promise: function (e) {
                            return null != e ? oe.extend(e, r) : r
                        }
                    }
                    , i = {};
                return r.pipe = r.then,
                    oe.each(t, function (e, o) {
                        var a = o[2]
                            , s = o[3];
                        r[o[1]] = a.add,
                            s && a.add(function () {
                                n = s
                            }, t[1 ^ e][2].disable, t[2][2].lock),
                            i[o[0]] = function () {
                                return i[o[0] + "With"](this === i ? r : this, arguments),
                                    this
                            }
                            ,
                            i[o[0] + "With"] = a.fireWith
                    }),
                    r.promise(i),
                    e && e.call(i, i),
                    i
            },
            when: function (e) {
                var t, n, r, i = 0, o = K.call(arguments), a = o.length, s = 1 !== a || e && oe.isFunction(e.promise) ? a : 0, c = 1 === s ? e : oe.Deferred(), u = function (e, n, r) {
                    return function (i) {
                        n[e] = this,
                            r[e] = arguments.length > 1 ? K.call(arguments) : i,
                            r === t ? c.notifyWith(n, r) : --s || c.resolveWith(n, r)
                    }
                };
                if (a > 1)
                    for (t = new Array(a),
                        n = new Array(a),
                        r = new Array(a); a > i; i++)
                        o[i] && oe.isFunction(o[i].promise) ? o[i].promise().progress(u(i, n, t)).done(u(i, r, o)).fail(c.reject) : --s;
                return s || c.resolveWith(r, o),
                    c.promise()
            }
        });
    var Ce;
    oe.fn.ready = function (e) {
        return oe.ready.promise().done(e),
            this
    }
        ,
        oe.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? oe.readyWait++ : oe.ready(!0)
            },
            ready: function (e) {
                (e === !0 ? --oe.readyWait : oe.isReady) || (oe.isReady = !0,
                    e !== !0 && --oe.readyWait > 0 || (Ce.resolveWith(Y, [oe]),
                        oe.fn.triggerHandler && (oe(Y).triggerHandler("ready"),
                            oe(Y).off("ready"))))
            }
        }),
        oe.ready.promise = function (t) {
            return Ce || (Ce = oe.Deferred(),
                "complete" === Y.readyState || "loading" !== Y.readyState && !Y.documentElement.doScroll ? e.setTimeout(oe.ready) : (Y.addEventListener("DOMContentLoaded", a),
                    e.addEventListener("load", a))),
                Ce.promise(t)
        }
        ,
        oe.ready.promise();
    var Te = function (e, t, n, r, i, o, a) {
        var s = 0
            , c = e.length
            , u = null == n;
        if ("object" === oe.type(n)) {
            i = !0;
            for (s in n)
                Te(e, t, s, n[s], !0, o, a)
        } else if (void 0 !== r && (i = !0,
            oe.isFunction(r) || (a = !0),
            u && (a ? (t.call(e, r),
                t = null) : (u = t,
                    t = function (e, t, n) {
                        return u.call(oe(e), n)
                    }
            )),
            t))
            for (; c > s; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : u ? t.call(e) : c ? t(e[0], n) : o
    }
        , xe = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    s.uid = 1,
        s.prototype = {
            register: function (e, t) {
                var n = t || {};
                return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                    value: n,
                    writable: !0,
                    configurable: !0
                }),
                    e[this.expando]
            },
            cache: function (e) {
                if (!xe(e))
                    return {};
                var t = e[this.expando];
                return t || (t = {},
                    xe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                        value: t,
                        configurable: !0
                    }))),
                    t
            },
            set: function (e, t, n) {
                var r, i = this.cache(e);
                if ("string" == typeof t)
                    i[t] = n;
                else
                    for (r in t)
                        i[r] = t[r];
                return i
            },
            get: function (e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
            },
            access: function (e, t, n) {
                var r;
                return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t),
                    void 0 !== r ? r : this.get(e, oe.camelCase(t))) : (this.set(e, t, n),
                        void 0 !== n ? n : t)
            },
            remove: function (e, t) {
                var n, r, i, o = e[this.expando];
                if (void 0 !== o) {
                    if (void 0 === t)
                        this.register(e);
                    else {
                        oe.isArray(t) ? r = t.concat(t.map(oe.camelCase)) : (i = oe.camelCase(t),
                            t in o ? r = [t, i] : (r = i,
                                r = r in o ? [r] : r.match(we) || [])),
                            n = r.length;
                        for (; n--;)
                            delete o[r[n]]
                    }
                    (void 0 === t || oe.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !oe.isEmptyObject(t)
            }
        };
    var Ee = new s
        , Ie = new s
        , Ae = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
        , Oe = /[A-Z]/g;
    oe.extend({
        hasData: function (e) {
            return Ie.hasData(e) || Ee.hasData(e)
        },
        data: function (e, t, n) {
            return Ie.access(e, t, n)
        },
        removeData: function (e, t) {
            Ie.remove(e, t)
        },
        _data: function (e, t, n) {
            return Ee.access(e, t, n)
        },
        _removeData: function (e, t) {
            Ee.remove(e, t)
        }
    }),
        oe.fn.extend({
            data: function (e, t) {
                var n, r, i, o = this[0], a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = Ie.get(o),
                        1 === o.nodeType && !Ee.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;)
                            a[n] && (r = a[n].name,
                                0 === r.indexOf("data-") && (r = oe.camelCase(r.slice(5)),
                                    c(o, r, i[r])));
                        Ee.set(o, "hasDataAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each(function () {
                    Ie.set(this, e)
                }) : Te(this, function (t) {
                    var n, r;
                    if (o && void 0 === t) {
                        if (n = Ie.get(o, e) || Ie.get(o, e.replace(Oe, "-$&").toLowerCase()),
                            void 0 !== n)
                            return n;
                        if (r = oe.camelCase(e),
                            n = Ie.get(o, r),
                            void 0 !== n)
                            return n;
                        if (n = c(o, r, void 0),
                            void 0 !== n)
                            return n
                    } else
                        r = oe.camelCase(e),
                            this.each(function () {
                                var n = Ie.get(this, r);
                                Ie.set(this, r, t),
                                    e.indexOf("-") > -1 && void 0 !== n && Ie.set(this, e, t)
                            })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function (e) {
                return this.each(function () {
                    Ie.remove(this, e)
                })
            }
        }),
        oe.extend({
            queue: function (e, t, n) {
                var r;
                return e ? (t = (t || "fx") + "queue",
                    r = Ee.get(e, t),
                    n && (!r || oe.isArray(n) ? r = Ee.access(e, t, oe.makeArray(n)) : r.push(n)),
                    r || []) : void 0
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = oe.queue(e, t)
                    , r = n.length
                    , i = n.shift()
                    , o = oe._queueHooks(e, t)
                    , a = function () {
                        oe.dequeue(e, t)
                    };
                "inprogress" === i && (i = n.shift(),
                    r--),
                    i && ("fx" === t && n.unshift("inprogress"),
                        delete o.stop,
                        i.call(e, a, o)),
                    !r && o && o.empty.fire()
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return Ee.get(e, n) || Ee.access(e, n, {
                    empty: oe.Callbacks("once memory").add(function () {
                        Ee.remove(e, [t + "queue", n])
                    })
                })
            }
        }),
        oe.fn.extend({
            queue: function (e, t) {
                var n = 2;
                return "string" != typeof e && (t = e,
                    e = "fx",
                    n--),
                    arguments.length < n ? oe.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                        var n = oe.queue(this, e, t);
                        oe._queueHooks(this, e),
                            "fx" === e && "inprogress" !== n[0] && oe.dequeue(this, e)
                    })
            },
            dequeue: function (e) {
                return this.each(function () {
                    oe.dequeue(this, e)
                })
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", [])
            },
            promise: function (e, t) {
                var n, r = 1, i = oe.Deferred(), o = this, a = this.length, s = function () {
                    --r || i.resolveWith(o, [o])
                };
                for ("string" != typeof e && (t = e,
                    e = void 0),
                    e = e || "fx"; a--;)
                    n = Ee.get(o[a], e + "queueHooks"),
                        n && n.empty && (r++,
                            n.empty.add(s));
                return s(),
                    i.promise(t)
            }
        });
    var je = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
        , ke = new RegExp("^(?:([+-])=|)(" + je + ")([a-z%]*)$", "i")
        , _e = ["Top", "Right", "Bottom", "Left"]
        , De = function (e, t) {
            return e = t || e,
                "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
        }
        , Ne = /^(?:checkbox|radio)$/i
        , Ue = /<([\w:-]+)/
        , Re = /^$|\/(?:java|ecma)script/i
        , Pe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Pe.optgroup = Pe.option,
        Pe.tbody = Pe.tfoot = Pe.colgroup = Pe.caption = Pe.thead,
        Pe.th = Pe.td;
    var Be = /<|&#?\w+;/;
    !function () {
        var e = Y.createDocumentFragment()
            , t = e.appendChild(Y.createElement("div"))
            , n = Y.createElement("input");
        n.setAttribute("type", "radio"),
            n.setAttribute("checked", "checked"),
            n.setAttribute("name", "t"),
            t.appendChild(n),
            re.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
            t.innerHTML = "<textarea>x</textarea>",
            re.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var Me = /^key/
        , qe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
        , ze = /^([^.]*)(?:\.(.+)|)/;
    oe.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var o, a, s, c, u, d, l, f, p, h, g, m = Ee.get(e);
            if (m)
                for (n.handler && (o = n,
                    n = o.handler,
                    i = o.selector),
                    n.guid || (n.guid = oe.guid++),
                    (c = m.events) || (c = m.events = {}),
                    (a = m.handle) || (a = m.handle = function (t) {
                        return "undefined" != typeof oe && oe.event.triggered !== t.type ? oe.event.dispatch.apply(e, arguments) : void 0
                    }
                    ),
                    t = (t || "").match(we) || [""],
                    u = t.length; u--;)
                    s = ze.exec(t[u]) || [],
                        p = g = s[1],
                        h = (s[2] || "").split(".").sort(),
                        p && (l = oe.event.special[p] || {},
                            p = (i ? l.delegateType : l.bindType) || p,
                            l = oe.event.special[p] || {},
                            d = oe.extend({
                                type: p,
                                origType: g,
                                data: r,
                                handler: n,
                                guid: n.guid,
                                selector: i,
                                needsContext: i && oe.expr.match.needsContext.test(i),
                                namespace: h.join(".")
                            }, o),
                            (f = c[p]) || (f = c[p] = [],
                                f.delegateCount = 0,
                                l.setup && l.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(p, a)),
                            l.add && (l.add.call(e, d),
                                d.handler.guid || (d.handler.guid = n.guid)),
                            i ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                            oe.event.global[p] = !0)
        },
        remove: function (e, t, n, r, i) {
            var o, a, s, c, u, d, l, f, p, h, g, m = Ee.hasData(e) && Ee.get(e);
            if (m && (c = m.events)) {
                for (t = (t || "").match(we) || [""],
                    u = t.length; u--;)
                    if (s = ze.exec(t[u]) || [],
                        p = g = s[1],
                        h = (s[2] || "").split(".").sort(),
                        p) {
                        for (l = oe.event.special[p] || {},
                            p = (r ? l.delegateType : l.bindType) || p,
                            f = c[p] || [],
                            s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            a = o = f.length; o--;)
                            d = f[o],
                                !i && g !== d.origType || n && n.guid !== d.guid || s && !s.test(d.namespace) || r && r !== d.selector && ("**" !== r || !d.selector) || (f.splice(o, 1),
                                    d.selector && f.delegateCount--,
                                    l.remove && l.remove.call(e, d));
                        a && !f.length && (l.teardown && l.teardown.call(e, h, m.handle) !== !1 || oe.removeEvent(e, p, m.handle),
                            delete c[p])
                    } else
                        for (p in c)
                            oe.event.remove(e, p + t[u], n, r, !0);
                oe.isEmptyObject(c) && Ee.remove(e, "handle events")
            }
        },
        dispatch: function (e) {
            e = oe.event.fix(e);
            var t, n, r, i, o, a = [], s = K.call(arguments), c = (Ee.get(this, "events") || {})[e.type] || [], u = oe.event.special[e.type] || {};
            if (s[0] = e,
                e.delegateTarget = this,
                !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (a = oe.event.handlers.call(this, e, c),
                    t = 0; (i = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem,
                        n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)
                        e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o,
                            e.data = o.data,
                            r = ((oe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s),
                            void 0 !== r && (e.result = r) === !1 && (e.preventDefault(),
                                e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e),
                    e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, a = [], s = t.delegateCount, c = e.target;
            if (s && c.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
                        for (r = [],
                            n = 0; s > n; n++)
                            o = t[n],
                                i = o.selector + " ",
                                void 0 === r[i] && (r[i] = o.needsContext ? oe(i, this).index(c) > -1 : oe.find(i, this, null, [c]).length),
                                r[i] && r.push(o);
                        r.length && a.push({
                            elem: c,
                            handlers: r
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }),
                a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                    e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, o = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || Y,
                    r = n.documentElement,
                    i = n.body,
                    e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0),
                    e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)),
                    e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                    e
            }
        },
        fix: function (e) {
            if (e[oe.expando])
                return e;
            var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = qe.test(i) ? this.mouseHooks : Me.test(i) ? this.keyHooks : {}),
                r = a.props ? this.props.concat(a.props) : this.props,
                e = new oe.Event(o),
                t = r.length; t--;)
                n = r[t],
                    e[n] = o[n];
            return e.target || (e.target = Y),
                3 === e.target.nodeType && (e.target = e.target.parentNode),
                a.filter ? a.filter(e, o) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    return this !== g() && this.focus ? (this.focus(),
                        !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    return this === g() && this.blur ? (this.blur(),
                        !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && oe.nodeName(this, "input") ? (this.click(),
                        !1) : void 0
                },
                _default: function (e) {
                    return oe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
        oe.removeEvent = function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }
        ,
        oe.Event = function (e, t) {
            return this instanceof oe.Event ? (e && e.type ? (this.originalEvent = e,
                this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : h) : this.type = e,
                t && oe.extend(this, t),
                this.timeStamp = e && e.timeStamp || oe.now(),
                void (this[oe.expando] = !0)) : new oe.Event(e, t)
        }
        ,
        oe.Event.prototype = {
            constructor: oe.Event,
            isDefaultPrevented: h,
            isPropagationStopped: h,
            isImmediatePropagationStopped: h,
            isSimulated: !1,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = p,
                    e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = p,
                    e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = p,
                    e && !this.isSimulated && e.stopImmediatePropagation(),
                    this.stopPropagation()
            }
        },
        oe.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (e, t) {
            oe.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n, r = this, i = e.relatedTarget, o = e.handleObj;
                    return i && (i === r || oe.contains(r, i)) || (e.type = o.origType,
                        n = o.handler.apply(this, arguments),
                        e.type = t),
                        n
                }
            }
        }),
        oe.fn.extend({
            on: function (e, t, n, r) {
                return m(this, e, t, n, r)
            },
            one: function (e, t, n, r) {
                return m(this, e, t, n, r, 1)
            },
            off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)
                    return r = e.handleObj,
                        oe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                        this;
                if ("object" == typeof e) {
                    for (i in e)
                        this.off(i, t, e[i]);
                    return this
                }
                return t !== !1 && "function" != typeof t || (n = t,
                    t = void 0),
                    n === !1 && (n = h),
                    this.each(function () {
                        oe.event.remove(this, e, n, t)
                    })
            }
        });
    var Le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
        , $e = /<script|<style|<link/i
        , Fe = /checked\s*(?:[^=]|=\s*.checked.)/i
        , He = /^true\/(.*)/
        , We = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    oe.extend({
        htmlPrefilter: function (e) {
            return e.replace(Le, "<$1></$2>")
        },
        clone: function (e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0), c = oe.contains(e.ownerDocument, e);
            if (!(re.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e)))
                for (a = d(s),
                    o = d(e),
                    r = 0,
                    i = o.length; i > r; r++)
                    w(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || d(e),
                        a = a || d(s),
                        r = 0,
                        i = o.length; i > r; r++)
                        S(o[r], a[r]);
                else
                    S(e, s);
            return a = d(s, "script"),
                a.length > 0 && l(a, !c && d(e, "script")),
                s
        },
        cleanData: function (e) {
            for (var t, n, r, i = oe.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (xe(n)) {
                    if (t = n[Ee.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? oe.event.remove(n, r) : oe.removeEvent(n, r, t.handle);
                        n[Ee.expando] = void 0
                    }
                    n[Ie.expando] && (n[Ie.expando] = void 0)
                }
        }
    }),
        oe.fn.extend({
            domManip: C,
            detach: function (e) {
                return T(this, e, !0)
            },
            remove: function (e) {
                return T(this, e)
            },
            text: function (e) {
                return Te(this, function (e) {
                    return void 0 === e ? oe.text(this) : this.empty().each(function () {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function () {
                return C(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = v(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function () {
                return C(this, arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = v(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function () {
                return C(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function () {
                return C(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                    1 === e.nodeType && (oe.cleanData(d(e, !1)),
                        e.textContent = "");
                return this
            },
            clone: function (e, t) {
                return e = null != e && e,
                    t = null == t ? e : t,
                    this.map(function () {
                        return oe.clone(this, e, t)
                    })
            },
            html: function (e) {
                return Te(this, function (e) {
                    var t = this[0] || {}
                        , n = 0
                        , r = this.length;
                    if (void 0 === e && 1 === t.nodeType)
                        return t.innerHTML;
                    if ("string" == typeof e && !$e.test(e) && !Pe[(Ue.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = oe.htmlPrefilter(e);
                        try {
                            for (; r > n; n++)
                                t = this[n] || {},
                                    1 === t.nodeType && (oe.cleanData(d(t, !1)),
                                        t.innerHTML = e);
                            t = 0
                        } catch (e) { }
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function () {
                var e = [];
                return C(this, arguments, function (t) {
                    var n = this.parentNode;
                    oe.inArray(this, e) < 0 && (oe.cleanData(d(this)),
                        n && n.replaceChild(t, this))
                }, e)
            }
        }),
        oe.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, t) {
            oe.fn[e] = function (e) {
                for (var n, r = [], i = oe(e), o = i.length - 1, a = 0; o >= a; a++)
                    n = a === o ? this : this.clone(!0),
                        oe(i[a])[t](n),
                        Q.apply(r, n.get());
                return this.pushStack(r)
            }
        });
    var Ge, Ve = {
        HTML: "block",
        BODY: "block"
    }, Je = /^margin/, Ye = new RegExp("^(" + je + ")(?!px)[a-z%]+$", "i"), Ke = function (t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
            n.getComputedStyle(t)
    }, Xe = function (e, t, n, r) {
        var i, o, a = {};
        for (o in t)
            a[o] = e.style[o],
                e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)
            e.style[o] = a[o];
        return i
    }, Qe = Y.documentElement;
    !function () {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                s.innerHTML = "",
                Qe.appendChild(a);
            var t = e.getComputedStyle(s);
            n = "1%" !== t.top,
                o = "2px" === t.marginLeft,
                r = "4px" === t.width,
                s.style.marginRight = "50%",
                i = "4px" === t.marginRight,
                Qe.removeChild(a)
        }
        var n, r, i, o, a = Y.createElement("div"), s = Y.createElement("div");
        s.style && (s.style.backgroundClip = "content-box",
            s.cloneNode(!0).style.backgroundClip = "",
            re.clearCloneStyle = "content-box" === s.style.backgroundClip,
            a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            a.appendChild(s),
            oe.extend(re, {
                pixelPosition: function () {
                    return t(),
                        n
                },
                boxSizingReliable: function () {
                    return null == r && t(),
                        r
                },
                pixelMarginRight: function () {
                    return null == r && t(),
                        i
                },
                reliableMarginLeft: function () {
                    return null == r && t(),
                        o
                },
                reliableMarginRight: function () {
                    var t, n = s.appendChild(Y.createElement("div"));
                    return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                        n.style.marginRight = n.style.width = "0",
                        s.style.width = "1px",
                        Qe.appendChild(a),
                        t = !parseFloat(e.getComputedStyle(n).marginRight),
                        Qe.removeChild(a),
                        s.removeChild(n),
                        t
                }
            }))
    }();
    var Ze = /^(none|table(?!-c[ea]).+)/
        , et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
        , tt = {
            letterSpacing: "0",
            fontWeight: "400"
        }
        , nt = ["Webkit", "O", "Moz", "ms"]
        , rt = Y.createElement("div").style;
    oe.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = I(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = oe.camelCase(t), c = e.style;
                return t = oe.cssProps[s] || (oe.cssProps[s] = O(s) || s),
                    a = oe.cssHooks[t] || oe.cssHooks[s],
                    void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t] : (o = typeof n,
                        "string" === o && (i = ke.exec(n)) && i[1] && (n = u(e, t, i),
                            o = "number"),
                        void (null != n && n === n && ("number" === o && (n += i && i[3] || (oe.cssNumber[s] ? "" : "px")),
                            re.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"),
                            a && "set" in a && void 0 === (n = a.set(e, n, r)) || (c[t] = n))))
            }
        },
        css: function (e, t, n, r) {
            var i, o, a, s = oe.camelCase(t);
            return t = oe.cssProps[s] || (oe.cssProps[s] = O(s) || s),
                a = oe.cssHooks[t] || oe.cssHooks[s],
                a && "get" in a && (i = a.get(e, !0, n)),
                void 0 === i && (i = I(e, t, r)),
                "normal" === i && t in tt && (i = tt[t]),
                "" === n || n ? (o = parseFloat(i),
                    n === !0 || isFinite(o) ? o || 0 : i) : i
        }
    }),
        oe.each(["height", "width"], function (e, t) {
            oe.cssHooks[t] = {
                get: function (e, n, r) {
                    return n ? Ze.test(oe.css(e, "display")) && 0 === e.offsetWidth ? Xe(e, et, function () {
                        return _(e, t, r)
                    }) : _(e, t, r) : void 0
                },
                set: function (e, n, r) {
                    var i, o = r && Ke(e), a = r && k(e, t, r, "border-box" === oe.css(e, "boxSizing", !1, o), o);
                    return a && (i = ke.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n,
                        n = oe.css(e, t)),
                        j(e, n, a)
                }
            }
        }),
        oe.cssHooks.marginLeft = A(re.reliableMarginLeft, function (e, t) {
            return t ? (parseFloat(I(e, "marginLeft")) || e.getBoundingClientRect().left - Xe(e, {
                marginLeft: 0
            }, function () {
                return e.getBoundingClientRect().left
            })) + "px" : void 0
        }),
        oe.cssHooks.marginRight = A(re.reliableMarginRight, function (e, t) {
            return t ? Xe(e, {
                display: "inline-block"
            }, I, [e, "marginRight"]) : void 0
        }),
        oe.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (e, t) {
            oe.cssHooks[e + t] = {
                expand: function (n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)
                        i[e + _e[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            },
                Je.test(e) || (oe.cssHooks[e + t].set = j)
        }),
        oe.fn.extend({
            css: function (e, t) {
                return Te(this, function (e, t, n) {
                    var r, i, o = {}, a = 0;
                    if (oe.isArray(t)) {
                        for (r = Ke(e),
                            i = t.length; i > a; a++)
                            o[t[a]] = oe.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? oe.style(e, t, n) : oe.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function () {
                return D(this, !0)
            },
            hide: function () {
                return D(this)
            },
            toggle: function (e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                    De(this) ? oe(this).show() : oe(this).hide()
                })
            }
        }),
        oe.Tween = N,
        N.prototype = {
            constructor: N,
            init: function (e, t, n, r, i, o) {
                this.elem = e,
                    this.prop = n,
                    this.easing = i || oe.easing._default,
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = o || (oe.cssNumber[n] ? "" : "px")
            },
            cur: function () {
                var e = N.propHooks[this.prop];
                return e && e.get ? e.get(this) : N.propHooks._default.get(this)
            },
            run: function (e) {
                var t, n = N.propHooks[this.prop];
                return this.options.duration ? this.pos = t = oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : N.propHooks._default.set(this),
                    this
            }
        },
        N.prototype.init.prototype = N.prototype,
        N.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = oe.css(e.elem, e.prop, ""),
                        t && "auto" !== t ? t : 0)
                },
                set: function (e) {
                    oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[oe.cssProps[e.prop]] && !oe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : oe.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        },
        N.propHooks.scrollTop = N.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        oe.easing = {
            linear: function (e) {
                return e
            },
            swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        },
        oe.fx = N.prototype.init,
        oe.fx.step = {};
    var it, ot, at = /^(?:toggle|show|hide)$/, st = /queueHooks$/;
    oe.Animation = oe.extend(q, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return u(n.elem, e, ke.exec(t), n),
                    n
            }
            ]
        },
        tweener: function (e, t) {
            oe.isFunction(e) ? (t = e,
                e = ["*"]) : e = e.match(we);
            for (var n, r = 0, i = e.length; i > r; r++)
                n = e[r],
                    q.tweeners[n] = q.tweeners[n] || [],
                    q.tweeners[n].unshift(t)
        },
        prefilters: [B],
        prefilter: function (e, t) {
            t ? q.prefilters.unshift(e) : q.prefilters.push(e)
        }
    }),
        oe.speed = function (e, t, n) {
            var r = e && "object" == typeof e ? oe.extend({}, e) : {
                complete: n || !n && t || oe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !oe.isFunction(t) && t
            };
            return r.duration = oe.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in oe.fx.speeds ? oe.fx.speeds[r.duration] : oe.fx.speeds._default,
                null != r.queue && r.queue !== !0 || (r.queue = "fx"),
                r.old = r.complete,
                r.complete = function () {
                    oe.isFunction(r.old) && r.old.call(this),
                        r.queue && oe.dequeue(this, r.queue)
                }
                ,
                r
        }
        ,
        oe.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(De).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function (e, t, n, r) {
                var i = oe.isEmptyObject(e)
                    , o = oe.speed(t, n, r)
                    , a = function () {
                        var t = q(this, oe.extend({}, e), o);
                        (i || Ee.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a,
                    i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function (e, t, n) {
                var r = function (e) {
                    var t = e.stop;
                    delete e.stop,
                        t(n)
                };
                return "string" != typeof e && (n = t,
                    t = e,
                    e = void 0),
                    t && e !== !1 && this.queue(e || "fx", []),
                    this.each(function () {
                        var t = !0
                            , i = null != e && e + "queueHooks"
                            , o = oe.timers
                            , a = Ee.get(this);
                        if (i)
                            a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a)
                                a[i] && a[i].stop && st.test(i) && r(a[i]);
                        for (i = o.length; i--;)
                            o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n),
                                t = !1,
                                o.splice(i, 1));
                        !t && n || oe.dequeue(this, e)
                    })
            },
            finish: function (e) {
                return e !== !1 && (e = e || "fx"),
                    this.each(function () {
                        var t, n = Ee.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = oe.timers, a = r ? r.length : 0;
                        for (n.finish = !0,
                            oe.queue(this, e, []),
                            i && i.stop && i.stop.call(this, !0),
                            t = o.length; t--;)
                            o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                                o.splice(t, 1));
                        for (t = 0; a > t; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
            }
        }),
        oe.each(["toggle", "show", "hide"], function (e, t) {
            var n = oe.fn[t];
            oe.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(R(t, !0), e, r, i)
            }
        }),
        oe.each({
            slideDown: R("show"),
            slideUp: R("hide"),
            slideToggle: R("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (e, t) {
            oe.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }),
        oe.timers = [],
        oe.fx.tick = function () {
            var e, t = 0, n = oe.timers;
            for (it = oe.now(); t < n.length; t++)
                e = n[t],
                    e() || n[t] !== e || n.splice(t--, 1);
            n.length || oe.fx.stop(),
                it = void 0
        }
        ,
        oe.fx.timer = function (e) {
            oe.timers.push(e),
                e() ? oe.fx.start() : oe.timers.pop()
        }
        ,
        oe.fx.interval = 13,
        oe.fx.start = function () {
            ot || (ot = e.setInterval(oe.fx.tick, oe.fx.interval))
        }
        ,
        oe.fx.stop = function () {
            e.clearInterval(ot),
                ot = null
        }
        ,
        oe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        oe.fn.delay = function (t, n) {
            return t = oe.fx ? oe.fx.speeds[t] || t : t,
                n = n || "fx",
                this.queue(n, function (n, r) {
                    var i = e.setTimeout(n, t);
                    r.stop = function () {
                        e.clearTimeout(i)
                    }
                })
        }
        ,
        function () {
            var e = Y.createElement("input")
                , t = Y.createElement("select")
                , n = t.appendChild(Y.createElement("option"));
            e.type = "checkbox",
                re.checkOn = "" !== e.value,
                re.optSelected = n.selected,
                t.disabled = !0,
                re.optDisabled = !n.disabled,
                e = Y.createElement("input"),
                e.value = "t",
                e.type = "radio",
                re.radioValue = "t" === e.value
        }();
    var ct, ut = oe.expr.attrHandle;
    oe.fn.extend({
        attr: function (e, t) {
            return Te(this, oe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                oe.removeAttr(this, e)
            })
        }
    }),
        oe.extend({
            attr: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return "undefined" == typeof e.getAttribute ? oe.prop(e, t, n) : (1 === o && oe.isXMLDoc(e) || (t = t.toLowerCase(),
                        i = oe.attrHooks[t] || (oe.expr.match.bool.test(t) ? ct : void 0)),
                        void 0 !== n ? null === n ? void oe.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                            n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = oe.find.attr(e, t),
                                null == r ? void 0 : r))
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!re.radioValue && "radio" === t && oe.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                        }
                    }
                }
            },
            removeAttr: function (e, t) {
                var n, r, i = 0, o = t && t.match(we);
                if (o && 1 === e.nodeType)
                    for (; n = o[i++];)
                        r = oe.propFix[n] || n,
                            oe.expr.match.bool.test(n) && (e[r] = !1),
                            e.removeAttribute(n)
            }
        }),
        ct = {
            set: function (e, t, n) {
                return t === !1 ? oe.removeAttr(e, n) : e.setAttribute(n, n),
                    n
            }
        },
        oe.each(oe.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var n = ut[t] || oe.find.attr;
            ut[t] = function (e, t, r) {
                var i, o;
                return r || (o = ut[t],
                    ut[t] = i,
                    i = null != n(e, t, r) ? t.toLowerCase() : null,
                    ut[t] = o),
                    i
            }
        });
    var dt = /^(?:input|select|textarea|button)$/i
        , lt = /^(?:a|area)$/i;
    oe.fn.extend({
        prop: function (e, t) {
            return Te(this, oe.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[oe.propFix[e] || e]
            })
        }
    }),
        oe.extend({
            prop: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return 1 === o && oe.isXMLDoc(e) || (t = oe.propFix[t] || t,
                        i = oe.propHooks[t]),
                        void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = oe.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : dt.test(e.nodeName) || lt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }),
        re.optSelected || (oe.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex,
                    null
            },
            set: function (e) {
                var t = e.parentNode;
                t && (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            oe.propFix[this.toLowerCase()] = this
        });
    var ft = /[\t\r\n\f]/g;
    oe.fn.extend({
        addClass: function (e) {
            var t, n, r, i, o, a, s, c = 0;
            if (oe.isFunction(e))
                return this.each(function (t) {
                    oe(this).addClass(e.call(this, t, z(this)))
                });
            if ("string" == typeof e && e)
                for (t = e.match(we) || []; n = this[c++];)
                    if (i = z(n),
                        r = 1 === n.nodeType && (" " + i + " ").replace(ft, " ")) {
                        for (a = 0; o = t[a++];)
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        s = oe.trim(r),
                            i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function (e) {
            var t, n, r, i, o, a, s, c = 0;
            if (oe.isFunction(e))
                return this.each(function (t) {
                    oe(this).removeClass(e.call(this, t, z(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(we) || []; n = this[c++];)
                    if (i = z(n),
                        r = 1 === n.nodeType && (" " + i + " ").replace(ft, " ")) {
                        for (a = 0; o = t[a++];)
                            for (; r.indexOf(" " + o + " ") > -1;)
                                r = r.replace(" " + o + " ", " ");
                        s = oe.trim(r),
                            i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : oe.isFunction(e) ? this.each(function (n) {
                oe(this).toggleClass(e.call(this, n, z(this), t), t)
            }) : this.each(function () {
                var t, r, i, o;
                if ("string" === n)
                    for (r = 0,
                        i = oe(this),
                        o = e.match(we) || []; t = o[r++];)
                        i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else
                    void 0 !== e && "boolean" !== n || (t = z(this),
                        t && Ee.set(this, "__className__", t),
                        this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Ee.get(this, "__className__") || ""))
            })
        },
        hasClass: function (e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + z(n) + " ").replace(ft, " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    });
    var pt = /\r/g
        , ht = /[\x20\t\r\n\f]+/g;
    oe.fn.extend({
        val: function (e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = oe.isFunction(e),
                this.each(function (n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, oe(this).val()) : e,
                        null == i ? i = "" : "number" == typeof i ? i += "" : oe.isArray(i) && (i = oe.map(i, function (e) {
                            return null == e ? "" : e + ""
                        })),
                        t = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()],
                        t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                })) : i ? (t = oe.valHooks[i.type] || oe.valHooks[i.nodeName.toLowerCase()],
                    t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value,
                        "string" == typeof n ? n.replace(pt, "") : null == n ? "" : n)) : void 0
        }
    }),
        oe.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = oe.find.attr(e, "value");
                        return null != t ? t : oe.trim(oe.text(e)).replace(ht, " ")
                    }
                },
                select: {
                    get: function (e) {
                        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, c = 0 > i ? s : o ? i : 0; s > c; c++)
                            if (n = r[c],
                                (n.selected || c === i) && (re.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !oe.nodeName(n.parentNode, "optgroup"))) {
                                if (t = oe(n).val(),
                                    o)
                                    return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function (e, t) {
                        for (var n, r, i = e.options, o = oe.makeArray(t), a = i.length; a--;)
                            r = i[a],
                                (r.selected = oe.inArray(oe.valHooks.option.get(r), o) > -1) && (n = !0);
                        return n || (e.selectedIndex = -1),
                            o
                    }
                }
            }
        }),
        oe.each(["radio", "checkbox"], function () {
            oe.valHooks[this] = {
                set: function (e, t) {
                    return oe.isArray(t) ? e.checked = oe.inArray(oe(e).val(), t) > -1 : void 0
                }
            },
                re.checkOn || (oe.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                }
                )
        });
    var gt = /^(?:focusinfocus|focusoutblur)$/;
    oe.extend(oe.event, {
        trigger: function (t, n, r, i) {
            var o, a, s, c, u, d, l, f = [r || Y], p = ne.call(t, "type") ? t.type : t, h = ne.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = r = r || Y,
                3 !== r.nodeType && 8 !== r.nodeType && !gt.test(p + oe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."),
                    p = h.shift(),
                    h.sort()),
                    u = p.indexOf(":") < 0 && "on" + p,
                    t = t[oe.expando] ? t : new oe.Event(p, "object" == typeof t && t),
                    t.isTrigger = i ? 2 : 3,
                    t.namespace = h.join("."),
                    t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    t.result = void 0,
                    t.target || (t.target = r),
                    n = null == n ? [t] : oe.makeArray(n, [t]),
                    l = oe.event.special[p] || {},
                    i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                if (!i && !l.noBubble && !oe.isWindow(r)) {
                    for (c = l.delegateType || p,
                        gt.test(c + p) || (a = a.parentNode); a; a = a.parentNode)
                        f.push(a),
                            s = a;
                    s === (r.ownerDocument || Y) && f.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0; (a = f[o++]) && !t.isPropagationStopped();)
                    t.type = o > 1 ? c : l.bindType || p,
                        d = (Ee.get(a, "events") || {})[t.type] && Ee.get(a, "handle"),
                        d && d.apply(a, n),
                        d = u && a[u],
                        d && d.apply && xe(a) && (t.result = d.apply(a, n),
                            t.result === !1 && t.preventDefault());
                return t.type = p,
                    i || t.isDefaultPrevented() || l._default && l._default.apply(f.pop(), n) !== !1 || !xe(r) || u && oe.isFunction(r[p]) && !oe.isWindow(r) && (s = r[u],
                        s && (r[u] = null),
                        oe.event.triggered = p,
                        r[p](),
                        oe.event.triggered = void 0,
                        s && (r[u] = s)),
                    t.result
            }
        },
        simulate: function (e, t, n) {
            var r = oe.extend(new oe.Event, n, {
                type: e,
                isSimulated: !0
            });
            oe.event.trigger(r, null, t)
        }
    }),
        oe.fn.extend({
            trigger: function (e, t) {
                return this.each(function () {
                    oe.event.trigger(e, t, this)
                })
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                return n ? oe.event.trigger(e, t, n, !0) : void 0
            }
        }),
        oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
            oe.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }),
        oe.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        re.focusin = "onfocusin" in e,
        re.focusin || oe.each({
            focus: "focusin",
            blur: "focusout"
        }, function (e, t) {
            var n = function (e) {
                oe.event.simulate(t, e.target, oe.event.fix(e))
            };
            oe.event.special[t] = {
                setup: function () {
                    var r = this.ownerDocument || this
                        , i = Ee.access(r, t);
                    i || r.addEventListener(e, n, !0),
                        Ee.access(r, t, (i || 0) + 1)
                },
                teardown: function () {
                    var r = this.ownerDocument || this
                        , i = Ee.access(r, t) - 1;
                    i ? Ee.access(r, t, i) : (r.removeEventListener(e, n, !0),
                        Ee.remove(r, t))
                }
            }
        });
    var mt = e.location
        , vt = oe.now()
        , bt = /\?/;
    oe.parseJSON = function (e) {
        return JSON.parse(e + "")
    }
        ,
        oe.parseXML = function (t) {
            var n;
            if (!t || "string" != typeof t)
                return null;
            try {
                n = (new e.DOMParser).parseFromString(t, "text/xml")
            } catch (e) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || oe.error("Invalid XML: " + t),
                n
        }
        ;
    var yt = /#.*$/
        , St = /([?&])_=[^&]*/
        , wt = /^(.*?):[ \t]*([^\r\n]*)$/gm
        , Ct = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
        , Tt = /^(?:GET|HEAD)$/
        , xt = /^\/\//
        , Et = {}
        , It = {}
        , At = "*/".concat("*")
        , Ot = Y.createElement("a");
    Ot.href = mt.href,
        oe.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: mt.href,
                type: "GET",
                isLocal: Ct.test(mt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": At,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": oe.parseJSON,
                    "text xml": oe.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function (e, t) {
                return t ? F(F(e, oe.ajaxSettings), t) : F(oe.ajaxSettings, e)
            },
            ajaxPrefilter: L(Et),
            ajaxTransport: L(It),
            ajax: function (t, n) {
                function r(t, n, r, s) {
                    var u, l, b, y, w, T = n;
                    2 !== S && (S = 2,
                        c && e.clearTimeout(c),
                        i = void 0,
                        a = s || "",
                        C.readyState = t > 0 ? 4 : 0,
                        u = t >= 200 && 300 > t || 304 === t,
                        r && (y = H(f, C, r)),
                        y = W(f, y, C, u),
                        u ? (f.ifModified && (w = C.getResponseHeader("Last-Modified"),
                            w && (oe.lastModified[o] = w),
                            w = C.getResponseHeader("etag"),
                            w && (oe.etag[o] = w)),
                            204 === t || "HEAD" === f.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = y.state,
                                l = y.data,
                                b = y.error,
                                u = !b)) : (b = T,
                                    !t && T || (T = "error",
                                        0 > t && (t = 0))),
                        C.status = t,
                        C.statusText = (n || T) + "",
                        u ? g.resolveWith(p, [l, T, C]) : g.rejectWith(p, [C, T, b]),
                        C.statusCode(v),
                        v = void 0,
                        d && h.trigger(u ? "ajaxSuccess" : "ajaxError", [C, f, u ? l : b]),
                        m.fireWith(p, [C, T]),
                        d && (h.trigger("ajaxComplete", [C, f]),
                            --oe.active || oe.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t,
                    t = void 0),
                    n = n || {};
                var i, o, a, s, c, u, d, l, f = oe.ajaxSetup({}, n), p = f.context || f, h = f.context && (p.nodeType || p.jquery) ? oe(p) : oe.event, g = oe.Deferred(), m = oe.Callbacks("once memory"), v = f.statusCode || {}, b = {}, y = {}, S = 0, w = "canceled", C = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === S) {
                            if (!s)
                                for (s = {}; t = wt.exec(a);)
                                    s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return 2 === S ? a : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return S || (e = y[n] = y[n] || e,
                            b[e] = t),
                            this
                    },
                    overrideMimeType: function (e) {
                        return S || (f.mimeType = e),
                            this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (2 > S)
                                for (t in e)
                                    v[t] = [v[t], e[t]];
                            else
                                C.always(e[C.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || w;
                        return i && i.abort(t),
                            r(0, t),
                            this
                    }
                };
                if (g.promise(C).complete = m.add,
                    C.success = C.done,
                    C.error = C.fail,
                    f.url = ((t || f.url || mt.href) + "").replace(yt, "").replace(xt, mt.protocol + "//"),
                    f.type = n.method || n.type || f.method || f.type,
                    f.dataTypes = oe.trim(f.dataType || "*").toLowerCase().match(we) || [""],
                    null == f.crossDomain) {
                    u = Y.createElement("a");
                    try {
                        u.href = f.url,
                            u.href = u.href,
                            f.crossDomain = Ot.protocol + "//" + Ot.host != u.protocol + "//" + u.host
                    } catch (e) {
                        f.crossDomain = !0
                    }
                }
                if (f.data && f.processData && "string" != typeof f.data && (f.data = oe.param(f.data, f.traditional)),
                    $(Et, f, n, C),
                    2 === S)
                    return C;
                d = oe.event && f.global,
                    d && 0 === oe.active++ && oe.event.trigger("ajaxStart"),
                    f.type = f.type.toUpperCase(),
                    f.hasContent = !Tt.test(f.type),
                    o = f.url,
                    f.hasContent || (f.data && (o = f.url += (bt.test(o) ? "&" : "?") + f.data,
                        delete f.data),
                        f.cache === !1 && (f.url = St.test(o) ? o.replace(St, "$1_=" + vt++) : o + (bt.test(o) ? "&" : "?") + "_=" + vt++)),
                    f.ifModified && (oe.lastModified[o] && C.setRequestHeader("If-Modified-Since", oe.lastModified[o]),
                        oe.etag[o] && C.setRequestHeader("If-None-Match", oe.etag[o])),
                    (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", f.contentType),
                    C.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + At + "; q=0.01" : "") : f.accepts["*"]);
                for (l in f.headers)
                    C.setRequestHeader(l, f.headers[l]);
                if (f.beforeSend && (f.beforeSend.call(p, C, f) === !1 || 2 === S))
                    return C.abort();
                w = "abort";
                for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                })
                    C[l](f[l]);
                if (i = $(It, f, n, C)) {
                    if (C.readyState = 1,
                        d && h.trigger("ajaxSend", [C, f]),
                        2 === S)
                        return C;
                    f.async && f.timeout > 0 && (c = e.setTimeout(function () {
                        C.abort("timeout")
                    }, f.timeout));
                    try {
                        S = 1,
                            i.send(b, r)
                    } catch (e) {
                        if (!(2 > S))
                            throw e;
                        r(-1, e)
                    }
                } else
                    r(-1, "No Transport");
                return C
            },
            getJSON: function (e, t, n) {
                return oe.get(e, t, n, "json")
            },
            getScript: function (e, t) {
                return oe.get(e, void 0, t, "script")
            }
        }),
        oe.each(["get", "post"], function (e, t) {
            oe[t] = function (e, n, r, i) {
                return oe.isFunction(n) && (i = i || r,
                    r = n,
                    n = void 0),
                    oe.ajax(oe.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, oe.isPlainObject(e) && e))
            }
        }),
        oe._evalUrl = function (e) {
            return oe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }
        ,
        oe.fn.extend({
            wrapAll: function (e) {
                var t;
                return oe.isFunction(e) ? this.each(function (t) {
                    oe(this).wrapAll(e.call(this, t))
                }) : (this[0] && (t = oe(e, this[0].ownerDocument).eq(0).clone(!0),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t.map(function () {
                        for (var e = this; e.firstElementChild;)
                            e = e.firstElementChild;
                        return e
                    }).append(this)),
                    this)
            },
            wrapInner: function (e) {
                return oe.isFunction(e) ? this.each(function (t) {
                    oe(this).wrapInner(e.call(this, t))
                }) : this.each(function () {
                    var t = oe(this)
                        , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function (e) {
                var t = oe.isFunction(e);
                return this.each(function (n) {
                    oe(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
                }).end()
            }
        }),
        oe.expr.filters.hidden = function (e) {
            return !oe.expr.filters.visible(e)
        }
        ,
        oe.expr.filters.visible = function (e) {
            return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
        }
        ;
    var jt = /%20/g
        , kt = /\[\]$/
        , _t = /\r?\n/g
        , Dt = /^(?:submit|button|image|reset|file)$/i
        , Nt = /^(?:input|select|textarea|keygen)/i;
    oe.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = oe.isFunction(t) ? t() : null == t ? "" : t,
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = oe.ajaxSettings && oe.ajaxSettings.traditional),
            oe.isArray(e) || e.jquery && !oe.isPlainObject(e))
            oe.each(e, function () {
                i(this.name, this.value)
            });
        else
            for (n in e)
                G(n, e[n], t, i);
        return r.join("&").replace(jt, "+")
    }
        ,
        oe.fn.extend({
            serialize: function () {
                return oe.param(this.serializeArray())
            },
            serializeArray: function () {
                return this.map(function () {
                    var e = oe.prop(this, "elements");
                    return e ? oe.makeArray(e) : this
                }).filter(function () {
                    var e = this.type;
                    return this.name && !oe(this).is(":disabled") && Nt.test(this.nodeName) && !Dt.test(e) && (this.checked || !Ne.test(e))
                }).map(function (e, t) {
                    var n = oe(this).val();
                    return null == n ? null : oe.isArray(n) ? oe.map(n, function (e) {
                        return {
                            name: t.name,
                            value: e.replace(_t, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(_t, "\r\n")
                    }
                }).get()
            }
        }),
        oe.ajaxSettings.xhr = function () {
            try {
                return new e.XMLHttpRequest
            } catch (e) { }
        }
        ;
    var Ut = {
        0: 200,
        1223: 204
    }
        , Rt = oe.ajaxSettings.xhr();
    re.cors = !!Rt && "withCredentials" in Rt,
        re.ajax = Rt = !!Rt,
        oe.ajaxTransport(function (t) {
            var n, r;
            return re.cors || Rt && !t.crossDomain ? {
                send: function (i, o) {
                    var a, s = t.xhr();
                    if (s.open(t.type, t.url, t.async, t.username, t.password),
                        t.xhrFields)
                        for (a in t.xhrFields)
                            s[a] = t.xhrFields[a];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                        t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (a in i)
                        s.setRequestHeader(a, i[a]);
                    n = function (e) {
                        return function () {
                            n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null,
                                "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Ut[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                    binary: s.response
                                } : {
                                    text: s.responseText
                                }, s.getAllResponseHeaders()))
                        }
                    }
                        ,
                        s.onload = n(),
                        r = s.onerror = n("error"),
                        void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
                            4 === s.readyState && e.setTimeout(function () {
                                n && r()
                            })
                        }
                        ,
                        n = n("abort");
                    try {
                        s.send(t.hasContent && t.data || null)
                    } catch (e) {
                        if (n)
                            throw e
                    }
                },
                abort: function () {
                    n && n()
                }
            } : void 0
        }),
        oe.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (e) {
                    return oe.globalEval(e),
                        e
                }
            }
        }),
        oe.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET")
        }),
        oe.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function (r, i) {
                        t = oe("<script>").prop({
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function (e) {
                            t.remove(),
                                n = null,
                                e && i("error" === e.type ? 404 : 200, e.type)
                        }
                        ),
                            Y.head.appendChild(t[0])
                    },
                    abort: function () {
                        n && n()
                    }
                }
            }
        });
    var Pt = []
        , Bt = /(=)\?(?=&|$)|\?\?/;
    oe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Pt.pop() || oe.expando + "_" + vt++;
            return this[e] = !0,
                e
        }
    }),
        oe.ajaxPrefilter("json jsonp", function (t, n, r) {
            var i, o, a, s = t.jsonp !== !1 && (Bt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Bt.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = oe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                s ? t[s] = t[s].replace(Bt, "$1" + i) : t.jsonp !== !1 && (t.url += (bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
                t.converters["script json"] = function () {
                    return a || oe.error(i + " was not called"),
                        a[0]
                }
                ,
                t.dataTypes[0] = "json",
                o = e[i],
                e[i] = function () {
                    a = arguments
                }
                ,
                r.always(function () {
                    void 0 === o ? oe(e).removeProp(i) : e[i] = o,
                        t[i] && (t.jsonpCallback = n.jsonpCallback,
                            Pt.push(i)),
                        a && oe.isFunction(o) && o(a[0]),
                        a = o = void 0
                }),
                "script") : void 0
        }),
        oe.parseHTML = function (e, t, n) {
            if (!e || "string" != typeof e)
                return null;
            "boolean" == typeof t && (n = t,
                t = !1),
                t = t || Y;
            var r = he.exec(e)
                , i = !n && [];
            return r ? [t.createElement(r[1])] : (r = f([e], t, i),
                i && i.length && oe(i).remove(),
                oe.merge([], r.childNodes))
        }
        ;
    var Mt = oe.fn.load;
    oe.fn.load = function (e, t, n) {
        if ("string" != typeof e && Mt)
            return Mt.apply(this, arguments);
        var r, i, o, a = this, s = e.indexOf(" ");
        return s > -1 && (r = oe.trim(e.slice(s)),
            e = e.slice(0, s)),
            oe.isFunction(t) ? (n = t,
                t = void 0) : t && "object" == typeof t && (i = "POST"),
            a.length > 0 && oe.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done(function (e) {
                o = arguments,
                    a.html(r ? oe("<div>").append(oe.parseHTML(e)).find(r) : e)
            }).always(n && function (e, t) {
                a.each(function () {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }
            ),
            this
    }
        ,
        oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            oe.fn[t] = function (e) {
                return this.on(t, e)
            }
        }),
        oe.expr.filters.animated = function (e) {
            return oe.grep(oe.timers, function (t) {
                return e === t.elem
            }).length
        }
        ,
        oe.offset = {
            setOffset: function (e, t, n) {
                var r, i, o, a, s, c, u, d = oe.css(e, "position"), l = oe(e), f = {};
                "static" === d && (e.style.position = "relative"),
                    s = l.offset(),
                    o = oe.css(e, "top"),
                    c = oe.css(e, "left"),
                    u = ("absolute" === d || "fixed" === d) && (o + c).indexOf("auto") > -1,
                    u ? (r = l.position(),
                        a = r.top,
                        i = r.left) : (a = parseFloat(o) || 0,
                            i = parseFloat(c) || 0),
                    oe.isFunction(t) && (t = t.call(e, n, oe.extend({}, s))),
                    null != t.top && (f.top = t.top - s.top + a),
                    null != t.left && (f.left = t.left - s.left + i),
                    "using" in t ? t.using.call(e, f) : l.css(f)
            }
        },
        oe.fn.extend({
            offset: function (e) {
                if (arguments.length)
                    return void 0 === e ? this : this.each(function (t) {
                        oe.offset.setOffset(this, e, t)
                    });
                var t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                }, o = r && r.ownerDocument;
                return o ? (t = o.documentElement,
                    oe.contains(t, r) ? (i = r.getBoundingClientRect(),
                        n = V(o),
                    {
                        top: i.top + n.pageYOffset - t.clientTop,
                        left: i.left + n.pageXOffset - t.clientLeft
                    }) : i) : void 0
            },
            position: function () {
                if (this[0]) {
                    var e, t, n = this[0], r = {
                        top: 0,
                        left: 0
                    };
                    return "fixed" === oe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(),
                        t = this.offset(),
                        oe.nodeName(e[0], "html") || (r = e.offset()),
                        r.top += oe.css(e[0], "borderTopWidth", !0),
                        r.left += oe.css(e[0], "borderLeftWidth", !0)),
                    {
                        top: t.top - r.top - oe.css(n, "marginTop", !0),
                        left: t.left - r.left - oe.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent; e && "static" === oe.css(e, "position");)
                        e = e.offsetParent;
                    return e || Qe
                })
            }
        }),
        oe.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (e, t) {
            var n = "pageYOffset" === t;
            oe.fn[e] = function (r) {
                return Te(this, function (e, r, i) {
                    var o = V(e);
                    return void 0 === i ? o ? o[t] : e[r] : void (o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
                }, e, r, arguments.length)
            }
        }),
        oe.each(["top", "left"], function (e, t) {
            oe.cssHooks[t] = A(re.pixelPosition, function (e, n) {
                return n ? (n = I(e, t),
                    Ye.test(n) ? oe(e).position()[t] + "px" : n) : void 0
            })
        }),
        oe.each({
            Height: "height",
            Width: "width"
        }, function (e, t) {
            oe.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function (n, r) {
                oe.fn[r] = function (r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r)
                        , a = n || (r === !0 || i === !0 ? "margin" : "border");
                    return Te(this, function (t, n, r) {
                        var i;
                        return oe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                            Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? oe.css(t, n, a) : oe.style(t, n, r, a)
                    }, t, o ? r : void 0, o, null)
                }
            })
        }),
        oe.fn.extend({
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function (e, t) {
                return this.off(e, null, t)
            },
            delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            size: function () {
                return this.length
            }
        }),
        oe.fn.andSelf = oe.fn.addBack,
        "function" == typeof define && define.amd && define("jquery", [], function () {
            return oe
        });
    var qt = e.jQuery
        , zt = e.$;
    return oe.noConflict = function (t) {
        return e.$ === oe && (e.$ = zt),
            t && e.jQuery === oe && (e.jQuery = qt),
            oe
    }
        ,
        t || (e.jQuery = e.$ = oe),
        oe
}),
    !function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function (t, n) {
            return void 0 === n && (n = "undefined" != typeof window ? require("jquery") : require("jquery")(t)),
                e(n),
                n
        }
            : e(jQuery)
    }(function (e) {
        "use strict";
        function t(e, n) {
            if (!(this instanceof t)) {
                var r = new t(e, n);
                return r.open(),
                    r
            }
            this.id = t.id++,
                this.setup(e, n),
                this.chainCallbacks(t._callbackChain)
        }
        function n(e, t) {
            var n = {};
            for (var r in e)
                r in t && (n[r] = e[r],
                    delete e[r]);
            return n
        }
        function r(e, t) {
            var n = {}
                , r = new RegExp("^" + t + "([A-Z])(.*)");
            for (var i in e) {
                var o = i.match(r);
                if (o) {
                    var a = (o[1] + o[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
                    n[a] = e[i]
                }
            }
            return n
        }
        if ("undefined" == typeof e)
            return void ("console" in window && void 0);
        if (e.fn.jquery.match(/-ajax/))
            return void ("console" in window && void 0);
        var i = []
            , o = function (t) {
                return i = e.grep(i, function (e) {
                    return e !== t && e.$instance.closest("body").length > 0
                })
            }
            , a = {
                allow: 1,
                allowfullscreen: 1,
                frameborder: 1,
                height: 1,
                longdesc: 1,
                marginheight: 1,
                marginwidth: 1,
                mozallowfullscreen: 1,
                name: 1,
                referrerpolicy: 1,
                sandbox: 1,
                scrolling: 1,
                src: 1,
                srcdoc: 1,
                style: 1,
                webkitallowfullscreen: 1,
                width: 1
            }
            , s = {
                keyup: "onKeyUp",
                resize: "onResize"
            }
            , c = function (n) {
                e.each(t.opened().reverse(), function () {
                    return n.isDefaultPrevented() || !1 !== this[s[n.type]](n) ? void 0 : (n.preventDefault(),
                        n.stopPropagation(),
                        !1)
                })
            }
            , u = function (n) {
                if (n !== t._globalHandlerInstalled) {
                    t._globalHandlerInstalled = n;
                    var r = e.map(s, function (e, n) {
                        return n + "." + t.prototype.namespace
                    }).join(" ");
                    e(window)[n ? "on" : "off"](r, c)
                }
            };
        t.prototype = {
            constructor: t,
            namespace: "featherlight",
            targetAttr: "data-featherlight",
            variant: null,
            resetCss: !1,
            background: null,
            openTrigger: "click",
            closeTrigger: "click",
            filter: null,
            root: "body",
            openSpeed: 250,
            closeSpeed: 250,
            closeOnClick: "background",
            closeOnEsc: !0,
            closeIcon: "&#10005;",
            loading: "",
            persist: !1,
            otherClose: null,
            beforeOpen: e.noop,
            beforeContent: e.noop,
            beforeClose: e.noop,
            afterOpen: e.noop,
            afterContent: e.noop,
            afterClose: e.noop,
            onKeyUp: e.noop,
            onResize: e.noop,
            type: null,
            contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
            setup: function (t, n) {
                "object" != typeof t || t instanceof e != 0 || n || (n = t,
                    t = void 0);
                var r = e.extend(this, n, {
                    target: t
                })
                    , i = r.resetCss ? r.namespace + "-reset" : r.namespace
                    , o = e(r.background || ['<div class="' + i + "-loading " + i + '">', '<div class="' + i + '-content">', '<button class="' + i + "-close-icon " + r.namespace + '-close" aria-label="Close">', r.closeIcon, "</button>", '<div class="' + r.namespace + '-inner">' + r.loading + "</div>", "</div>", "</div>"].join(""))
                    , a = "." + r.namespace + "-close" + (r.otherClose ? "," + r.otherClose : "");
                return r.$instance = o.clone().addClass(r.variant),
                    r.$instance.on(r.closeTrigger + "." + r.namespace, function (t) {
                        if (!t.isDefaultPrevented()) {
                            var n = e(t.target);
                            ("background" === r.closeOnClick && n.is("." + r.namespace) || "anywhere" === r.closeOnClick || n.closest(a).length) && (r.close(t),
                                t.preventDefault())
                        }
                    }),
                    this
            },
            getContent: function () {
                if (this.persist !== !1 && this.$content)
                    return this.$content;
                var t = this
                    , n = this.constructor.contentFilters
                    , r = function (e) {
                        return t.$currentTarget && t.$currentTarget.attr(e)
                    }
                    , i = r(t.targetAttr)
                    , o = t.target || i || ""
                    , a = n[t.type];
                if (!a && o in n && (a = n[o],
                    o = t.target && i),
                    o = o || r("href") || "",
                    !a)
                    for (var s in n)
                        t[s] && (a = n[s],
                            o = t[s]);
                if (!a) {
                    var c = o;
                    if (o = null,
                        e.each(t.contentFilters, function () {
                            return a = n[this],
                                a.test && (o = a.test(c)),
                                !o && a.regex && c.match && c.match(a.regex) && (o = c),
                                !o
                        }),
                        !o)
                        return "console" in window && void 0,
                            !1
                }
                return a.process.call(t, o)
            },
            setContent: function (t) {
                return this.$instance.removeClass(this.namespace + "-loading"),
                    this.$instance.toggleClass(this.namespace + "-iframe", t.is("iframe")),
                    this.$instance.find("." + this.namespace + "-inner").not(t).slice(1).remove().end().replaceWith(e.contains(this.$instance[0], t[0]) ? "" : t),
                    this.$content = t.addClass(this.namespace + "-inner"),
                    this
            },
            open: function (t) {
                var n = this;
                if (n.$instance.hide().appendTo(n.root),
                    !(t && t.isDefaultPrevented() || n.beforeOpen(t) === !1)) {
                    t && t.preventDefault();
                    var r = n.getContent();
                    if (r)
                        return i.push(n),
                            u(!0),
                            n.$instance.fadeIn(n.openSpeed),
                            n.beforeContent(t),
                            e.when(r).always(function (e) {
                                e && (n.setContent(e),
                                    n.afterContent(t))
                            }).then(n.$instance.promise()).done(function () {
                                n.afterOpen(t)
                            })
                }
                return n.$instance.detach(),
                    e.Deferred().reject().promise()
            },
            close: function (t) {
                var n = this
                    , r = e.Deferred();
                return n.beforeClose(t) === !1 ? r.reject() : (0 === o(n).length && u(!1),
                    n.$instance.fadeOut(n.closeSpeed, function () {
                        n.$instance.detach(),
                            n.afterClose(t),
                            r.resolve()
                    })),
                    r.promise()
            },
            resize: function (e, t) {
                if (e && t) {
                    this.$content.css("width", "").css("height", "");
                    var n = Math.max(e / (this.$content.parent().width() - 1), t / (this.$content.parent().height() - 1));
                    n > 1 && (n = t / Math.floor(t / n),
                        this.$content.css("width", "" + e / n + "px").css("height", "" + t / n + "px"))
                }
            },
            chainCallbacks: function (t) {
                for (var n in t)
                    this[n] = e.proxy(t[n], this, e.proxy(this[n], this))
            }
        },
            e.extend(t, {
                id: 0,
                autoBind: "[data-featherlight]",
                defaults: t.prototype,
                contentFilters: {
                    jquery: {
                        regex: /^[#.]\w/,
                        test: function (t) {
                            return t instanceof e && t
                        },
                        process: function (t) {
                            return this.persist !== !1 ? e(t) : e(t).clone(!0)
                        }
                    },
                    image: {
                        regex: /\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,
                        process: function (t) {
                            var n = this
                                , r = e.Deferred()
                                , i = new Image
                                , o = e('<img src="' + t + '" alt="" class="' + n.namespace + '-image" />');
                            return i.onload = function () {
                                o.naturalWidth = i.width,
                                    o.naturalHeight = i.height,
                                    r.resolve(o)
                            }
                                ,
                                i.onerror = function () {
                                    r.reject(o)
                                }
                                ,
                                i.src = t,
                                r.promise()
                        }
                    },
                    html: {
                        regex: /^\s*<[\w!][^<]*>/,
                        process: function (t) {
                            return e(t)
                        }
                    },
                    ajax: {
                        regex: /./,
                        process: function (t) {
                            var n = e.Deferred()
                                , r = e("<div></div>").load(t, function (e, t) {
                                    "error" !== t && n.resolve(r.contents()),
                                        n.reject()
                                });
                            return n.promise()
                        }
                    },
                    iframe: {
                        process: function (t) {
                            var i = new e.Deferred
                                , o = e("<iframe/>")
                                , s = r(this, "iframe")
                                , c = n(s, a);
                            return o.hide().attr("src", t).attr(c).css(s).on("load", function () {
                                i.resolve(o.show())
                            }).appendTo(this.$instance.find("." + this.namespace + "-content")),
                                i.promise()
                        }
                    },
                    text: {
                        process: function (t) {
                            return e("<div>", {
                                text: t
                            })
                        }
                    }
                },
                functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
                readElementConfig: function (t, n) {
                    var r = this
                        , i = new RegExp("^data-" + n + "-(.*)")
                        , o = {};
                    return t && t.attributes && e.each(t.attributes, function () {
                        var t = this.name.match(i);
                        if (t) {
                            var n = this.value
                                , a = e.camelCase(t[1]);
                            if (e.inArray(a, r.functionAttributes) >= 0)
                                n = new Function(n);
                            else
                                try {
                                    n = JSON.parse(n)
                                } catch (e) { }
                            o[a] = n
                        }
                    }),
                        o
                },
                extend: function (t, n) {
                    var r = function () {
                        this.constructor = t
                    };
                    return r.prototype = this.prototype,
                        t.prototype = new r,
                        t.__super__ = this.prototype,
                        e.extend(t, this, n),
                        t.defaults = t.prototype,
                        t
                },
                attach: function (t, n, r) {
                    var i = this;
                    "object" != typeof n || n instanceof e != 0 || r || (r = n,
                        n = void 0),
                        r = e.extend({}, r);
                    var o, a = r.namespace || i.defaults.namespace, s = e.extend({}, i.defaults, i.readElementConfig(t[0], a), r), c = function (a) {
                        var c = e(a.currentTarget)
                            , u = e.extend({
                                $source: t,
                                $currentTarget: c
                            }, i.readElementConfig(t[0], s.namespace), i.readElementConfig(a.currentTarget, s.namespace), r)
                            , d = o || c.data("featherlight-persisted") || new i(n, u);
                        "shared" === d.persist ? o = d : d.persist !== !1 && c.data("featherlight-persisted", d),
                            u.$currentTarget.blur && u.$currentTarget.blur(),
                            d.open(a)
                    };
                    return t.on(s.openTrigger + "." + s.namespace, s.filter, c),
                    {
                        filter: s.filter,
                        handler: c
                    }
                },
                current: function () {
                    var e = this.opened();
                    return e[e.length - 1] || null
                },
                opened: function () {
                    var t = this;
                    return o(),
                        e.grep(i, function (e) {
                            return e instanceof t
                        })
                },
                close: function (e) {
                    var t = this.current();
                    return t ? t.close(e) : void 0
                },
                _onReady: function () {
                    var t = this;
                    if (t.autoBind) {
                        var n = e(t.autoBind);
                        n.each(function () {
                            t.attach(e(this))
                        }),
                            e(document).on("click", t.autoBind, function (r) {
                                if (!r.isDefaultPrevented()) {
                                    var i = e(r.currentTarget)
                                        , o = n.length;
                                    if (n = n.add(i),
                                        o !== n.length) {
                                        var a = t.attach(i);
                                        (!a.filter || e(r.target).parentsUntil(i, a.filter).length > 0) && a.handler(r)
                                    }
                                }
                            })
                    }
                },
                _callbackChain: {
                    onKeyUp: function (t, n) {
                        return 27 === n.keyCode ? (this.closeOnEsc && e.featherlight.close(n),
                            !1) : t(n)
                    },
                    beforeOpen: function (t, n) {
                        return e(document.documentElement).addClass("with-featherlight"),
                            this._previouslyActive = document.activeElement,
                            this._$previouslyTabbable = e("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),
                            this._$previouslyWithTabIndex = e("[tabindex]").not('[tabindex="-1"]'),
                            this._previousWithTabIndices = this._$previouslyWithTabIndex.map(function (t, n) {
                                return e(n).attr("tabindex")
                            }),
                            this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex", -1),
                            document.activeElement.blur && document.activeElement.blur(),
                            t(n)
                    },
                    afterClose: function (n, r) {
                        var i = n(r)
                            , o = this;
                        return this._$previouslyTabbable.removeAttr("tabindex"),
                            this._$previouslyWithTabIndex.each(function (t, n) {
                                e(n).attr("tabindex", o._previousWithTabIndices[t])
                            }),
                            this._previouslyActive.focus(),
                            0 === t.opened().length && e(document.documentElement).removeClass("with-featherlight"),
                            i
                    },
                    onResize: function (e, t) {
                        return this.resize(this.$content.naturalWidth, this.$content.naturalHeight),
                            e(t)
                    },
                    afterContent: function (e, t) {
                        var n = e(t);
                        return this.$instance.find("[autofocus]:not([disabled])").focus(),
                            this.onResize(t),
                            n
                    }
                }
            }),
            e.featherlight = t,
            e.fn.featherlight = function (e, n) {
                return t.attach(this, e, n),
                    this
            }
            ,
            e(document).ready(function () {
                t._onReady()
            })
    });
var Config = {
    paddingTop: 44,
    paddingBottom: 44,
    headerHeight: 44,
    footerHeight: 44,
    scenePaddingBottom: 60,
    bannerHeight: 50,
    sidebarWidth: 50,
    crosshairWidth: 100,
    panTimeThreshold: 300,
    panPixelThreshold: 2,
    loopLineWidth: 4,
    nonogramsCellSize: 15,
    shikakuSeparatorWidth: 1,
    shikakuRectBorderWidth: 2,
    shikakuClassicSeparatorWidth: 3,
    shikakuClassicRectBorderWidth: 3,
    bridgesSquare: 18,
    bridgesSeparator: 0,
    bridgesSize: 2,
    sidebarWidth: 210,
    mainContainerWidth: 750,
    sideBannerWidth: 170,
    topMenuHeight: 44
};
jQuery.cachedScript = function (e, t) {
    return t = $.extend(t || {}, {
        dataType: "script",
        cache: !0,
        url: e
    }),
        jQuery.ajax(t)
}
    ,
    $(document).ready(function () {
        $("#btnShare").click(function (e) {
            e.preventDefault(),
                window.scrollBy(0, 50),
                $("#shareContainer").show(),
                $("#shareContainerElements").hide(),
                $("#shareContainerLoader").show(),
                getPermalink1()
        })
    });
try {
    !function () {
        function e() {
            function e() {
                var t = a.document
                    , n = !!a.frames[i];
                if (!n)
                    if (t.body) {
                        var r = t.createElement("iframe");
                        r.style.cssText = "display:none",
                            r.name = i,
                            t.body.appendChild(r)
                    } else
                        setTimeout(e, 5);
                return !n
            }
            function t() {
                var e, t = arguments;
                if (!t.length)
                    return o;
                if ("setGdprApplies" === t[0])
                    t.length > 3 && 2 === t[2] && "boolean" == typeof t[3] && (e = t[3],
                        "function" == typeof t[2] && t[2]("set", !0));
                else if ("ping" === t[0]) {
                    var n = {
                        gdprApplies: e,
                        cmpLoaded: !1,
                        cmpStatus: "stub"
                    };
                    "function" == typeof t[2] && t[2](n)
                } else
                    o.push(t)
            }
            function n(e) {
                var t = "string" == typeof e.data
                    , n = {};
                try {
                    n = t ? JSON.parse(e.data) : e.data
                } catch (e) { }
                var r = n.__tcfapiCall;
                r && window.__tcfapi(r.command, r.version, function (n, i) {
                    var o = {
                        __tcfapiReturn: {
                            returnValue: n,
                            success: i,
                            callId: r.callId
                        }
                    };
                    t && (o = JSON.stringify(o)),
                        e.source.postMessage(o, "*")
                }, r.parameter)
            }
            for (var r, i = "__tcfapiLocator", o = [], a = window; a;) {
                try {
                    if (a.frames[i]) {
                        r = a;
                        break
                    }
                } catch (e) { }
                if (a === window.top)
                    break;
                a = a.parent
            }
            r || (e(),
                a.__tcfapi = t,
                a.addEventListener("message", n, !1))
        }
        var t = window.top.location.hostname.replace(/^.{1,4}\./, "").replace(/\.test$/, "")
            , n = "www." + t
            , r = document.createElement("script")
            , i = document.getElementsByTagName("script")[0]
            , o = ((new Date).getTime(),
                "https://quantcast.mgr.consensu.org".concat("/choice/", "vptV-UyUkzTeZ", "/", n, "/choice.js"))
            , a = 0
            , s = 3;
        r.async = !0,
            r.type = "text/javascript",
            r.src = o,
            i.parentNode.insertBefore(r, i),
            e();
        var c = function () {
            var e = arguments;
            typeof window.__uspapi !== c && setTimeout(function () {
                "undefined" != typeof window.__uspapi && window.__uspapi.apply(window.__uspapi, e)
            }, 500)
        }
            , u = function () {
                a++,
                    window.__uspapi === c && a < s || clearInterval(d)
            };
        if ("undefined" == typeof window.__uspapi) {
            window.__uspapi = c;
            var d = setInterval(u, 6e3)
        }
    }()
} catch (e) { }
var lgCounter = 0;
$(window).on("orientationchange resize", function (e) {
    Layout.setOrientation()
}),
    $(function () {
        $(document).on("click", ".js-box-close", function () {
            $(this).parent().hide()
        }),
            $(".js-box-close-global").on("click", function () {
                hideGlobalNotifications()
            }),
            $.featherlight._callbackChain.beforeOpen = function (e) { }
            ,
            $.featherlight._callbackChain.afterClose = function (e) { }
    }),
    $.ajaxSetup({
        xhrFields: {
            withCredentials: !0
        },
        beforeSend: function (e) {
            Get_Cookie("api_token") && e.setRequestHeader("authorization", Get_Cookie("api_token"))
        }
    }),
    $(document).ajaxComplete(function (e, t, n) {
        t.responseJSON && (t.responseJSON.user && User.load(t.responseJSON.user),
            MVVM && MVVM.apply())
    }),
    $.fn.panzoom = function (e) { }
    ;
var browserPrefixes = ["moz", "ms", "o", "webkit"]
    , isVisible = !0
    , browserPrefix = getBrowserPrefix()
    , hiddenPropertyName = getHiddenPropertyName(browserPrefix)
    , visibilityEventName = getVisibilityEvent(browserPrefix);
document.addEventListener(visibilityEventName, handleVisibilityChange, !1),
    document.addEventListener("focus", function () {
        handleVisibilityChange(!0)
    }, !1),
    document.addEventListener("blur", function () {
        handleVisibilityChange(!1)
    }, !1),
    window.addEventListener("focus", function () {
        handleVisibilityChange(!0)
    }, !1),
    window.addEventListener("blur", function () {
        handleVisibilityChange(!1)
    }, !1);
var Layout = {
    portrait: !0,
    setOrientation: function () {
        this.portrait = window.innerHeight > window.innerWidth,
            $("body").toggleClass("landscape", !this.portrait).toggleClass("portrait", this.portrait).toggleClass("lefthanded", Settings.get("global.left-handed")),
            setZoom(getZoom())
    },
    init: function () {
        this.setOrientation()
    },
    scrollTop: function () {
        return window.scrollY ? window.scrollY : document.documentElement ? document.documentElement.scrollTop : 0
    },
    scrollLeft: function () {
        return window.scrollX ? window.scrollX : document.documentElement ? document.documentElement.scrollLeft : 0
    },
    clientWidth: function () {
        return document.body.clientWidth;
    },
    clientHeight: function () {
        return window.innerHeight
    },
    isSubscriber: function () {
        return $("body").hasClass("subscriber")
    },
    toggleHeader: function () {
        $("body").toggleClass("header-hidden"),
            window.ga && ga("send", "event", "Layout", "Header", this.hiddenHeader() ? "hide" : "show")
    },
    hiddenHeader: function () {
        return !0
    },
    getBottomBannerHeight: function () {
        return $("body").hasClass("subscriber") ? 0 : 50
    }
};
$(window).on("unload", function () {
    $(window).scrollTop(0)
});
var MVVM = {
    apply: function () {
        $("[mvvm-text]").each(function () {
            var t = $(this);
            try {
                var val = eval(t.attr("mvvm-text"));
                t.text("undefined" == typeof val ? "" : val)
            } catch (e) {
                t.text("")
            }
        }),
            $("[mvvm-show]").each(function () {
                var t = $(this)
                    , val = eval(t.attr("mvvm-show"));
                t.toggle("undefined" != typeof val && !!val)
            }),
            $("[mvvm-value]").each(function () {
                var t = $(this)
                    , val = eval(t.attr("mvvm-value"));
                t.val("undefined" == typeof val ? "" : val)
            }),
            $("[mvvm-checked]").each(function () {
                var t = $(this)
                    , val = eval(t.attr("mvvm-checked"));
                t.attr("checked", "undefined" != typeof val && !!val)
            }),
            $("[mvvm-selected]").each(function () {
                try {
                    var t = $(this)
                        , val = eval(t.attr("mvvm-selected"));
                    t.val(val)
                } catch (e) { }
            }),
            $("[mvvm-class]").each(function () {
                for (var t = $(this), attr = t.attr("mvvm-class").split("|"), i = 0; i < attr.length; i++) {
                    var cls = attr[i].split(":");
                    try {
                        var val = eval(cls[1]);
                        t.toggleClass(cls[0], "undefined" != typeof val && !!val)
                    } catch (e) {
                        t.toggleClass(cls[0], !1)
                    }
                }
            }),
            $("[mvvm-css]").each(function () {
                for (var t = $(this), attr = t.attr("mvvm-css").split("|"), i = 0; i < attr.length; i++) {
                    var css = attr[i].split(":");
                    try {
                        css.length > 2 && (css[1] = css.splice(1).join(":"));
                        var val = eval(css[1]);
                        t.css(css[0], "undefined" == typeof val ? "auto" : val)
                    } catch (e) { }
                }
            })
    }
};
String.prototype.repeat || (String.prototype.repeat = function (e) {
    "use strict";
    if (null == this)
        throw new TypeError("can't convert " + this + " to object");
    var t = "" + this;
    if (e = +e,
        e != e && (e = 0),
        e < 0)
        throw new RangeError("repeat count must be non-negative");
    if (e == 1 / 0)
        throw new RangeError("repeat count must be less than infinity");
    if (e = Math.floor(e),
        0 == t.length || 0 == e)
        return "";
    if (t.length * e >= 1 << 28)
        throw new RangeError("repeat count must not overflow maximum string size");
    for (var n = "", r = 0; r < e; r++)
        n += t;
    return n
}
),
    String.prototype.startsWith || (String.prototype.startsWith = function (e, t) {
        return t = t || 0,
            this.substr(t, e.length) === e
    }
    );
var User = {
    logged: 0,
    patron: 0,
    email: "",
    nick: "",
    xp: 0,
    init: function () {
        this.logged = 0,
            this.patron = 0,
            this.email = "",
            this.nick = "",
            this.xp = 0,
            MVVM.apply()
    },
    loadFromStorage: function () {
        if (null != readCookie("api_token")) {
            var e = JSON.parse(localStorage.getItem("User"));
            this.load(e)
        }
    },
    store: function () {
        try {
            localStorage.setItem("User", JSON.stringify(this))
        } catch (e) { }
    },
    load: function (e) {
        this.logged = 1;
        for (k in e)
            this[k] = e[k];
        if (this.store(),
            $("#user-logged-badge .progress").animate({
                width: e.levelXP / e.totalLevelXP * 100 + "%"
            }, 1e3),
            "undefined" != typeof puzzleSlug && ($(".quest-" + puzzleSlug).each(function () {
                $(this).find(".quest-tier").text("1"),
                    $(this).find(".progress").css({
                        width: "0%"
                    })
            }),
                e.achievements[puzzleSlug])) {
            var t = e.achievements[puzzleSlug];
            for (size in t)
                $(".quest-" + puzzleSlug + "-" + size).each(function () {
                    var e = 100;
                    puzzleSlug + "-" + size == "skyscrapers-4x4-easy" && (e = 3),
                        t[size].level > e ? ($(this).find(".quest-tier").html("&check;"),
                            $(this).find(".quest-tier-badge").css({
                                color: "#66ff66"
                            }),
                            $(this).find(".progress").animate({
                                width: "100%"
                            })) : ($(this).find(".quest-tier").text(t[size].level),
                                $(this).find(".progress").animate({
                                    width: t[size].progress + "%"
                                }))
                })
        }
        MVVM.apply()
    },
    loadFromAjax: function (e) {
        var t = this;
        $.ajax({
            url: "https://" + mobile_host + "/api/profile",
            xhrFields: {
                withCredentials: !0
            },
            crossDomain: !0,
            success: function (n) {
                createCookie("api_token", n.api_token, 365);
                var r = t.patron ? 1 : 0;
                t.load(n);
                try {
                    var i = window.top.location;
                    i.href;
                    r != n.patron && window.location.reload()
                } catch (e) { }
                e || $.featherlight.close()
            },
            error: function (n) {
                t.reset(),
                    e && $.featherlight.close()
            }
        })
    },
    showLogin: function () {
        return this.init(),
            $.featherlight.close(),
            $.featherlight("/partials/form.login.php", {}),
            !1
    },
    reset: function () {
        eraseCookie("api_token"),
            this.logged = 0,
            this.patron = 0,
            this.email = "",
            this.achievements = {},
            this.nick = "",
            this.xp = 0,
            this.api_token = "",
            this.store(),
            MVVM.apply()
    },
    logout: function () {
        var e = this;
        $.ajax({
            url: "https://" + mobile_host + "/api/logout",
            xhrFields: {
                withCredentials: !0
            }
        }).done(function (t) {
            $.featherlight.close(),
                e.reset()
        })
    },
    update: function (e) {
        $.post("https://" + mobile_host + "/api/profile", e).done(function (e) {
            $(".js-registration-success").show()
        }).fail(function (e) {
            if (e.responseJSON)
                var t = $.map(e.responseJSON, function (e) {
                    return e
                }).join("<br>");
            else
                var t = e.responseText;
            $(".js-login-error").show().find(".message").html(t)
        }).always(function () {
            $("button .animate-spin").hide()
        })
    }
};
window.addEventListener("message", function (e) {
    (e.origin.startsWith("https://www.puzzles-mobile.com") || e.origin.startsWith("https://dev.puzzles-mobile.com")) && "loadUser" == e.data && loadUser()
}),
    $(".favorite").on("click", function () {
        var e = this.dataset.slug;
        if (User.arrFavorites.indexOf(e) != -1) {
            var t = $(this);
            $.post("/api/favorite", {
                removeFavorite: e
            }).done(function (n) {
                t.closest("li").insertBefore($("#firstTextLi")).find(".favorite").removeClass("on");
                var r = User.arrFavorites.indexOf(e);
                r !== -1 && User.arrFavorites.splice(r, 1)
            })
        } else {
            var t = $(this);
            $.post("/api/favorite", {
                addFavorite: e
            }).done(function (n) {
                t.closest("li").prependTo(t.closest("ul")).find(".favorite").addClass("on"),
                    User.arrFavorites.push(e)
            })
        }
    }),
    $(document).ajaxStart(function () {
        $("#user-cert").addClass("animate-spin")
    }),
    $(document).ajaxStop(function () {
        $("#user-cert").removeClass("animate-spin")
    });
var Util = {
    clone: function (e) {
        return $.extend(!0, {}, e)
    }
};
if (!function (e) {
    function t(n) {
        if (r[n])
            return r[n].exports;
        var i = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, t),
            i.l = !0,
            i.exports
    }
    var n = window.pbjsChunk;
    window.pbjsChunk = function (r, o, a) {
        for (var s, c, u, d = 0, l = []; d < r.length; d++)
            c = r[d],
                i[c] && l.push(i[c][0]),
                i[c] = 0;
        for (s in o)
            Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
        for (n && n(r, o, a); l.length;)
            l.shift()();
        if (a)
            for (d = 0; d < a.length; d++)
                u = t(t.s = a[d]);
        return u
    }
        ;
    var r = {}
        , i = {
            356: 0
        };
    t.m = e,
        t.c = r,
        t.d = function (e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }
        ,
        t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            }
                : function () {
                    return e
                }
                ;
            return t.d(n, "a", n),
                n
        }
        ,
        t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        t.p = "",
        t.oe = function (e) {
            throw e
        }
        ,
        t(t.s = 894)
}({
    0: function (e, t, n) {
        "use strict";
        function r(e, t) {
            return function (e) {
                if (Array.isArray(e))
                    return e
            }(e) || function (e, t) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
                    var n = []
                        , r = !0
                        , i = !1
                        , o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
                            !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        i = !0,
                            o = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (i)
                                throw o
                        }
                    }
                    return n
                }
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        function i(e) {
            return function (e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++)
                        n[t] = e[t];
                    return n
                }
            }(e) || function (e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
                    return Array.from(e)
            }(e) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        function o(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        function a() {
            return (a = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function s(e) {
            return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function c() {
            return we() + Math.random().toString(16).substr(2)
        }
        function u() {
            return window && window.crypto && window.crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] % 16 : 16 * Math.random()
        }
        function d(e) {
            if (l(e))
                return e[0] + "x" + e[1]
        }
        function l(e) {
            return x(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1])
        }
        function f() {
            return window.top
        }
        function p() {
            return window.self
        }
        function h() {
            return window.location
        }
        function g() {
            S() && pe && console.log.apply(console, y(arguments, "MESSAGE:"))
        }
        function m() {
            S() && he && console.info.apply(console, y(arguments, "INFO:"))
        }
        function v() {
            S() && ge && console.warn.apply(console, y(arguments, "WARNING:"))
        }
        function b() {
            S() && me && console.error.apply(console, y(arguments, "ERROR:")),
                ve.emit(ie.EVENTS.AUCTION_DEBUG, {
                    type: "ERROR",
                    arguments: arguments
                })
        }
        function y(e, t) {
            return e = [].slice.call(e),
                t && e.unshift(t),
                e.unshift("display: inline-block; color: #fff; background: #3b88c3; padding: 1px 4px; border-radius: 3px;"),
                e.unshift("%cPrebid"),
                e
        }
        function S() {
            return !!J.b.getConfig("debug")
        }
        function w(e, t) {
            return le.call(e) === "[object " + t + "]"
        }
        function C(e) {
            return w(e, se)
        }
        function T(e) {
            return w(e, ae)
        }
        function x(e) {
            return w(e, oe)
        }
        function E(e) {
            return w(e, ce)
        }
        function I(e) {
            return w(e, ue)
        }
        function A(e) {
            if (!e)
                return !0;
            if (x(e) || T(e))
                return !(0 < e.length);
            for (var t in e)
                if (hasOwnProperty.call(e, t))
                    return !1;
            return !0
        }
        function O(e, t) {
            if (!A(e)) {
                if (C(e.forEach))
                    return e.forEach(t, this);
                var n = 0
                    , r = e.length;
                if (0 < r)
                    for (; n < r; n++)
                        t(e[n], n, e);
                else
                    for (n in e)
                        hasOwnProperty.call(e, n) && t.call(this, e[n], n)
            }
        }
        function j(e, t) {
            return e.hasOwnProperty ? e.hasOwnProperty(t) : void 0 !== e[t] && e.constructor.prototype[t] !== e[t]
        }
        function k(e, t, n, r) {
            var i;
            t = t || document,
                i = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");
            try {
                if ((i = i.length ? i : t.getElementsByTagName("body")).length) {
                    i = i[0];
                    var o = r ? null : i.firstChild;
                    return i.insertBefore(e, o)
                }
            } catch (e) { }
        }
        function _(e, t) {
            var n = new Image;
            t && be.isFn(t) && (n.addEventListener("load", t),
                n.addEventListener("error", t)),
                n.src = e
        }
        function D(e, t) {
            var n = be.createTrackPixelIframeHtml(e, !1, "allow-scripts allow-same-origin")
                , r = document.createElement("div");
            r.innerHTML = n;
            var i = r.firstChild;
            t && be.isFn(t) && (i.addEventListener("load", t),
                i.addEventListener("error", t)),
                be.insertElement(i, document, "html", !0)
        }
        function N(e) {
            var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "";
            return e ? ((!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1]) && (e = encodeURI(e)),
                t = t && 'sandbox="'.concat(t, '"'),
                "<iframe ".concat(t, ' id="').concat(c(), '"\n      frameborder="0"\n      allowtransparency="true"\n      marginheight="0" marginwidth="0"\n      width="0" hspace="0" vspace="0" height="0"\n      style="height:0px;width:0px;display:none;"\n      scrolling="no"\n      src="').concat(e, '">\n    </iframe>')) : ""
        }
        function U(e, t, n) {
            return null == t ? n : T(t) ? t : E(t) ? t.toString() : void be.logWarn("Unsuported type for param: " + e + " required type: String")
        }
        function R(e, t, n) {
            return n.indexOf(e) === t
        }
        function P(e, t) {
            return e.concat(t)
        }
        function B(e) {
            return Object.keys(e)
        }
        function M(e, t) {
            return e[t]
        }
        function q() {
            if (window.googletag && C(window.googletag.pubads) && C(window.googletag.pubads().getSlots))
                return !0
        }
        function z(e, t) {
            return function (n, r) {
                return n.cpm === r.cpm ? t(n[e], r[e]) ? r : n : n.cpm < r.cpm ? r : n
            }
        }
        function L(e) {
            return K()(e)
        }
        function $() {
            if (window.navigator.cookieEnabled || document.cookie.length)
                return !0
        }
        function F(e) {
            return function (t) {
                return Ee(t, e)
            }
        }
        function H(e) {
            return Number.isInteger ? Number.isInteger(e) : "number" == typeof e && isFinite(e) && Math.floor(e) === e
        }
        function W(e) {
            return e ? e.replace(/^\?/, "").split("&").reduce(function (e, t) {
                var n = r(t.split("="), 2)
                    , i = n[0]
                    , o = n[1];
                return /\[\]$/.test(i) ? (e[i = i.replace("[]", "")] = e[i] || [],
                    e[i].push(o)) : e[i] = o || "",
                    e
            }, {}) : {}
        }
        function G(e) {
            return Object.keys(e).map(function (t) {
                return Array.isArray(e[t]) ? e[t].map(function (e) {
                    return "".concat(t, "[]=").concat(e)
                }).join("&") : "".concat(t, "=").concat(e[t])
            }).join("&")
        }
        function V(e, t) {
            if (e === t)
                return !0;
            if ("object" !== s(e) || null === e || "object" !== s(t) || null === t)
                return !1;
            if (Object.keys(e).length !== Object.keys(t).length)
                return !1;
            for (var n in e) {
                if (!t.hasOwnProperty(n))
                    return !1;
                if (!V(e[n], t[n]))
                    return !1
            }
            return !0
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            n.d(t, "internal", function () {
                return be
            }),
            n.d(t, "bind", function () {
                return Se
            }),
            t.getUniqueIdentifierStr = c,
            t.generateUUID = function e(t) {
                return t ? (t ^ u() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e)
            }
            ,
            t.getBidIdParameter = function (e, t) {
                return t && t[e] ? t[e] : ""
            }
            ,
            t.tryAppendQueryString = function (e, t, n) {
                return n ? e + t + "=" + encodeURIComponent(n) + "&" : e
            }
            ,
            t.parseQueryStringParameters = function (e) {
                var t = "";
                for (var n in e)
                    e.hasOwnProperty(n) && (t += n + "=" + encodeURIComponent(e[n]) + "&");
                return t = t.replace(/&$/, "")
            }
            ,
            t.transformAdServerTargetingObj = function (e) {
                return e && 0 < Object.getOwnPropertyNames(e).length ? B(e).map(function (t) {
                    return "".concat(t, "=").concat(encodeURIComponent(M(e, t)))
                }).join("&") : ""
            }
            ,
            t.getAdUnitSizes = function (e) {
                if (e) {
                    var t = [];
                    if (e.mediaTypes && e.mediaTypes.banner && Array.isArray(e.mediaTypes.banner.sizes)) {
                        var n = e.mediaTypes.banner.sizes;
                        Array.isArray(n[0]) ? t = n : t.push(n)
                    } else
                        Array.isArray(e.sizes) && (Array.isArray(e.sizes[0]) ? t = e.sizes : t.push(e.sizes));
                    return t
                }
            }
            ,
            t.parseSizesInput = function (e) {
                var t = [];
                if ("string" == typeof e) {
                    var n = e.split(",")
                        , r = /^(\d)+x(\d)+$/i;
                    if (n)
                        for (var i in n)
                            j(n, i) && n[i].match(r) && t.push(n[i])
                } else if ("object" === s(e)) {
                    var o = e.length;
                    if (0 < o)
                        if (2 === o && "number" == typeof e[0] && "number" == typeof e[1])
                            t.push(d(e));
                        else
                            for (var a = 0; a < o; a++)
                                t.push(d(e[a]))
                }
                return t
            }
            ,
            t.parseGPTSingleSizeArray = d,
            t.parseGPTSingleSizeArrayToRtbSize = function (e) {
                if (l(e))
                    return {
                        w: e[0],
                        h: e[1]
                    }
            }
            ,
            t.getWindowTop = f,
            t.getWindowSelf = p,
            t.getWindowLocation = h,
            t.logMessage = g,
            t.logInfo = m,
            t.logWarn = v,
            t.logError = b,
            t.hasConsoleLogger = function () {
                return pe
            }
            ,
            t.debugTurnedOn = S,
            t.createInvisibleIframe = function () {
                var e = document.createElement("iframe");
                return e.id = c(),
                    e.height = 0,
                    e.width = 0,
                    e.border = "0px",
                    e.hspace = "0",
                    e.vspace = "0",
                    e.marginWidth = "0",
                    e.marginHeight = "0",
                    e.style.border = "0",
                    e.scrolling = "no",
                    e.frameBorder = "0",
                    e.src = "about:blank",
                    e.style.display = "none",
                    e
            }
            ,
            t.getParameterByName = function (e) {
                return W(h().search)[e] || ""
            }
            ,
            t.isA = w,
            t.isFn = C,
            t.isStr = T,
            t.isArray = x,
            t.isNumber = E,
            t.isPlainObject = I,
            t.isBoolean = function (e) {
                return w(e, de)
            }
            ,
            t.isEmpty = A,
            t.isEmptyStr = function (e) {
                return T(e) && (!e || 0 === e.length)
            }
            ,
            t._each = O,
            t.contains = function (e, t) {
                if (A(e))
                    return !1;
                if (C(e.indexOf))
                    return -1 !== e.indexOf(t);
                for (var n = e.length; n--;)
                    if (e[n] === t)
                        return !0;
                return !1
            }
            ,
            t._map = function (e, t) {
                if (A(e))
                    return [];
                if (C(e.map))
                    return e.map(t);
                var n = [];
                return O(e, function (r, i) {
                    n.push(t(r, i, e))
                }),
                    n
            }
            ,
            t.hasOwn = j,
            t.insertElement = k,
            t.triggerPixel = _,
            t.callBurl = function (e) {
                var t = e.source
                    , n = e.burl;
                t === ie.S2S.SRC && n && be.triggerPixel(n)
            }
            ,
            t.insertHtmlIntoIframe = function (e) {
                if (e) {
                    var t = document.createElement("iframe");
                    t.id = c(),
                        t.width = 0,
                        t.height = 0,
                        t.hspace = "0",
                        t.vspace = "0",
                        t.marginWidth = "0",
                        t.marginHeight = "0",
                        t.style.display = "none",
                        t.style.height = "0px",
                        t.style.width = "0px",
                        t.scrolling = "no",
                        t.frameBorder = "0",
                        t.allowtransparency = "true",
                        be.insertElement(t, document, "body"),
                        t.contentWindow.document.open(),
                        t.contentWindow.document.write(e),
                        t.contentWindow.document.close()
                }
            }
            ,
            t.insertUserSyncIframe = D,
            t.createTrackPixelHtml = function (e) {
                if (!e)
                    return "";
                var t = encodeURI(e)
                    , n = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
                return n += '<img src="' + t + '"></div>'
            }
            ,
            t.createTrackPixelIframeHtml = N,
            t.getValueString = U,
            t.uniques = R,
            t.flatten = P,
            t.getBidRequest = function (e, t) {
                return e ? (t.some(function (t) {
                    var r = Q()(t.bids, function (t) {
                        return ["bidId", "adId", "bid_id"].some(function (n) {
                            return t[n] === e
                        })
                    });
                    return r && (n = r),
                        r
                }),
                    n) : void 0;
                var n
            }
            ,
            t.getKeys = B,
            t.getValue = M,
            t.getKeyByValue = function (e, t) {
                for (var n in e)
                    if (e.hasOwnProperty(n) && e[n] === t)
                        return n
            }
            ,
            t.getBidderCodes = function () {
                return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : pbjs.adUnits).map(function (e) {
                    return e.bids.map(function (e) {
                        return e.bidder
                    }).reduce(P, [])
                }).reduce(P).filter(R)
            }
            ,
            t.isGptPubadsDefined = q,
            n.d(t, "getHighestCpm", function () {
                return Ce
            }),
            n.d(t, "getOldestHighestCpmBid", function () {
                return Te
            }),
            n.d(t, "getLatestHighestCpmBid", function () {
                return xe
            }),
            t.shuffle = function (e) {
                for (var t = e.length; 0 < t;) {
                    var n = Math.floor(Math.random() * t)
                        , r = e[--t];
                    e[t] = e[n],
                        e[n] = r
                }
                return e
            }
            ,
            t.adUnitsFilter = function (e, t) {
                return ee()(e, t && t.adUnitCode)
            }
            ,
            t.deepClone = L,
            t.inIframe = function () {
                try {
                    return be.getWindowSelf() !== be.getWindowTop()
                } catch (e) {
                    return !0
                }
            }
            ,
            t.isSafariBrowser = function () {
                return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
            }
            ,
            t.replaceAuctionPrice = function (e, t) {
                if (e)
                    return e.replace(/\$\{AUCTION_PRICE\}/g, t)
            }
            ,
            t.replaceClickThrough = function (e, t) {
                if (e && t && "string" == typeof t)
                    return e.replace(/\${CLICKTHROUGH}/g, t)
            }
            ,
            t.timestamp = function () {
                return (new Date).getTime()
            }
            ,
            t.hasDeviceAccess = function () {
                return !1 !== J.b.getConfig("deviceAccess")
            }
            ,
            t.checkCookieSupport = $,
            t.delayExecution = function (e, t) {
                if (t < 1)
                    throw new Error("numRequiredCalls must be a positive number. Got ".concat(t));
                var n = 0;
                return function () {
                    ++n === t && e.apply(this, arguments)
                }
            }
            ,
            t.groupBy = function (e, t) {
                return e.reduce(function (e, n) {
                    return (e[n[t]] = e[n[t]] || []).push(n),
                        e
                }, {})
            }
            ,
            t.getDefinedParams = function (e, t) {
                return t.filter(function (t) {
                    return e[t]
                }).reduce(function (t, n) {
                    return a(t, o({}, n, e[n]))
                }, {})
            }
            ,
            t.isValidMediaTypes = function (e) {
                var t = ["banner", "native", "video"];
                return !!Object.keys(e).every(function (e) {
                    return ee()(t, e)
                }) && (!e.video || !e.video.context || ee()(["instream", "outstream", "adpod"], e.video.context))
            }
            ,
            t.getBidderRequest = function (e, t, n) {
                return Q()(e, function (e) {
                    return 0 < e.bids.filter(function (e) {
                        return e.bidder === t && e.adUnitCode === n
                    }).length
                }) || {
                    start: null,
                    auctionId: null
                }
            }
            ,
            t.getUserConfiguredParams = function (e, t, n) {
                return e.filter(function (e) {
                    return e.code === t
                }).map(function (e) {
                    return e.bids
                }).reduce(P, []).filter(function (e) {
                    return e.bidder === n
                }).map(function (e) {
                    return e.params || {}
                })
            }
            ,
            t.getOrigin = function () {
                return window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
            }
            ,
            t.getDNT = function () {
                return "1" === navigator.doNotTrack || "1" === window.doNotTrack || "1" === navigator.msDoNotTrack || "yes" === navigator.doNotTrack
            }
            ,
            t.isAdUnitCodeMatchingSlot = function (e) {
                return function (t) {
                    return Ee(e, t)
                }
            }
            ,
            t.isSlotMatchingAdUnitCode = F,
            t.getGptSlotInfoForAdUnitCode = function (e) {
                var t;
                return q() && (t = Q()(window.googletag.pubads().getSlots(), F(e))),
                    t ? {
                        gptSlot: t.getAdUnitPath(),
                        divId: t.getSlotElementId()
                    } : {}
            }
            ,
            t.unsupportedBidderMessage = function (e, t) {
                var n = Object.keys(e.mediaTypes || {
                    banner: "banner"
                }).join(", ");
                return "\n    ".concat(e.code, " is a ").concat(n, " ad unit\n    containing bidders that don't support ").concat(n, ": ").concat(t, ".\n    This bidder won't fetch demand.\n  ")
            }
            ,
            t.isInteger = H,
            t.convertCamelToUnderscore = function (e) {
                return e.replace(/(?:^|\.?)([A-Z])/g, function (e, t) {
                    return "_" + t.toLowerCase()
                }).replace(/^_/, "")
            }
            ,
            t.cleanObj = function (e) {
                return Object.keys(e).reduce(function (t, n) {
                    return void 0 !== e[n] && (t[n] = e[n]),
                        t
                }, {})
            }
            ,
            t.pick = function (e, t) {
                return "object" === s(e) ? t.reduce(function (n, r, i) {
                    if ("function" == typeof r)
                        return n;
                    var o = r
                        , a = r.match(/^(.+?)\sas\s(.+?)$/i);
                    a && (r = a[1],
                        o = a[2]);
                    var s = e[r];
                    return "function" == typeof t[i + 1] && (s = t[i + 1](s, n)),
                        void 0 !== s && (n[o] = s),
                        n
                }, {}) : {}
            }
            ,
            t.transformBidderParamKeywords = function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "keywords"
                    , n = [];
                return O(e, function (e, r) {
                    if (x(e)) {
                        var i = [];
                        O(e, function (e) {
                            !(e = U(t + "." + r, e)) && "" !== e || i.push(e)
                        }),
                            e = i
                    } else {
                        if (!T(e = U(t + "." + r, e)))
                            return;
                        e = [e]
                    }
                    n.push({
                        key: r,
                        value: e
                    })
                }),
                    n
            }
            ,
            t.convertTypes = function (e, t) {
                return Object.keys(e).forEach(function (n) {
                    var r, i;
                    t[n] && (C(e[n]) ? t[n] = e[n](t[n]) : t[n] = (r = e[n],
                        i = t[n],
                        "string" === r ? i && i.toString() : "number" === r ? Number(i) : i),
                        isNaN(t[n]) && delete t.key)
                }),
                    t
            }
            ,
            t.isArrayOfNums = function (e, t) {
                return x(e) && (!t || e.length === t) && e.every(function (e) {
                    return H(e)
                })
            }
            ,
            t.fill = function (e, t) {
                for (var n = [], r = 0; r < t; r++) {
                    var i = I(e) ? L(e) : e;
                    n.push(i)
                }
                return n
            }
            ,
            t.chunk = function (e, t) {
                for (var n = [], r = 0; r < Math.ceil(e.length / t); r++) {
                    var i = r * t
                        , o = i + t;
                    n.push(e.slice(i, o))
                }
                return n
            }
            ,
            t.getMinValueFromArray = function (e) {
                return Math.min.apply(Math, i(e))
            }
            ,
            t.getMaxValueFromArray = function (e) {
                return Math.max.apply(Math, i(e))
            }
            ,
            t.compareOn = function (e) {
                return function (t, n) {
                    return t[e] < n[e] ? 1 : t[e] > n[e] ? -1 : 0
                }
            }
            ,
            t.parseQS = W,
            t.formatQS = G,
            t.parseUrl = function (e, t) {
                var n = document.createElement("a");
                t && "noDecodeWholeURL" in t && t.noDecodeWholeURL ? n.href = e : n.href = decodeURIComponent(e);
                var r = t && "decodeSearchAsString" in t && t.decodeSearchAsString;
                return {
                    href: n.href,
                    protocol: (n.protocol || "").replace(/:$/, ""),
                    hostname: n.hostname,
                    port: +n.port,
                    pathname: n.pathname.replace(/^(?!\/)/, "/"),
                    search: r ? n.search : be.parseQS(n.search || ""),
                    hash: (n.hash || "").replace(/^#/, ""),
                    host: n.host || window.location.host
                }
            }
            ,
            t.buildUrl = function (e) {
                return (e.protocol || "http") + "://" + (e.host || e.hostname + (e.port ? ":".concat(e.port) : "")) + (e.pathname || "") + (e.search ? "?".concat(be.formatQS(e.search || "")) : "") + (e.hash ? "#".concat(e.hash) : "")
            }
            ,
            t.deepEqual = V,
            t.mergeDeep = function e(t) {
                for (var n = arguments.length, r = new Array(1 < n ? n - 1 : 0), i = 1; i < n; i++)
                    r[i - 1] = arguments[i];
                if (!r.length)
                    return t;
                var s = r.shift();
                if (I(t) && I(s))
                    for (var c in s)
                        I(s[c]) ? (t[c] || a(t, o({}, c, {})),
                            e(t[c], s[c])) : x(s[c]) && t[c] ? x(t[c]) && (t[c] = t[c].concat(s[c])) : a(t, o({}, c, s[c]));
                return e.apply(void 0, [t].concat(r))
            }
            ,
            t.cyrb53Hash = function (e) {
                for (var t, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, r = function (e, t) {
                    if (C(Math.imul))
                        return Math.imul(e, t);
                    var n = (4194303 & e) * (t |= 0);
                    return 4290772992 & e && (n += (4290772992 & e) * t | 0),
                        0 | n
                }, i = 3735928559 ^ n, o = 1103547991 ^ n, a = 0; a < e.length; a++)
                    t = e.charCodeAt(a),
                        i = r(i ^ t, 2654435761),
                        o = r(o ^ t, 1597334677);
                return i = r(i ^ i >>> 16, 2246822507) ^ r(o ^ o >>> 13, 3266489909),
                    (4294967296 * (2097151 & (o = r(o ^ o >>> 16, 2246822507) ^ r(i ^ i >>> 13, 3266489909))) + (i >>> 0)).toString()
            }
            ;
        var J = n(3)
            , Y = n(158)
            , K = n.n(Y)
            , X = n(10)
            , Q = n.n(X)
            , Z = n(12)
            , ee = n.n(Z)
            , te = n(159);
        n.d(t, "deepAccess", function () {
            return te.a
        });
        var ne = n(160);
        n.d(t, "deepSetValue", function () {
            return ne.a
        });
        var re, ie = n(5), oe = "Array", ae = "String", se = "Function", ce = "Number", ue = "Object", de = "Boolean", le = Object.prototype.toString, fe = Boolean(window.console), pe = Boolean(fe && window.console.log), he = Boolean(fe && window.console.info), ge = Boolean(fe && window.console.warn), me = Boolean(fe && window.console.error), ve = n(8), be = {
            checkCookieSupport: $,
            createTrackPixelIframeHtml: N,
            getWindowSelf: p,
            getWindowTop: f,
            getWindowLocation: h,
            insertUserSyncIframe: D,
            insertElement: k,
            isFn: C,
            triggerPixel: _,
            logError: b,
            logWarn: v,
            logMessage: g,
            logInfo: m,
            parseQS: W,
            formatQS: G,
            deepEqual: V
        }, ye = {}, Se = function (e, t) {
            return t
        }
            .bind(null, 1, ye)() === ye ? Function.prototype.bind : function (e) {
                var t = this
                    , n = Array.prototype.slice.call(arguments, 1);
                return function () {
                    return t.apply(e, n.concat(Array.prototype.slice.call(arguments)))
                }
            }
            , we = (re = 0,
                function () {
                    return ++re
                }
            ), Ce = z("timeToRespond", function (e, t) {
                return t < e
            }), Te = z("responseTimestamp", function (e, t) {
                return t < e
            }), xe = z("responseTimestamp", function (e, t) {
                return e < t
            }), Ee = function (e, t) {
                return e.getAdUnitPath() === t || e.getSlotElementId() === t
            }
    },
    1: function (e, t, n) {
        "use strict";
        function r(e, t) {
            return function (e) {
                if (Array.isArray(e))
                    return e
            }(e) || function (e, t) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
                    var n = []
                        , r = !0
                        , i = !1
                        , o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
                            !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        i = !0,
                            o = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (i)
                                throw o
                        }
                    }
                    return n
                }
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function o() {
            return (o = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function a(e) {
            function t(t, n, r) {
                k(e, t, n, r)
            }
            function n(t) {
                return !!e.isBidRequestValid(t) || (Object(T.logWarn)("Invalid bid sent to bidder ".concat(e.code, ": ").concat(JSON.stringify(t))),
                    !1)
            }
            return o(new u.a(e.code), {
                getSpec: function () {
                    return Object.freeze(e)
                },
                registerSyncs: t,
                callBids: function (r, a, s, u, d, l) {
                    function p() {
                        s(),
                            y.a.emit(v.a.EVENTS.BIDDER_DONE, r),
                            t(g, r.gdprConsent, r.uspConsent)
                    }
                    if (Array.isArray(r.bids)) {
                        var h = {}
                            , g = []
                            , m = r.bids.filter(n);
                        if (0 !== m.length) {
                            var b = {};
                            m.forEach(function (e) {
                                (b[e.bidId] = e).adUnitCode || (e.adUnitCode = e.placementCode)
                            });
                            var S = e.buildRequests(m, r);
                            if (S && 0 !== S.length) {
                                Array.isArray(S) || (S = [S]);
                                var w = Object(T.delayExecution)(l(p), S.length);
                                S.forEach(function (t) {
                                    function n(n, i) {
                                        function s(t) {
                                            var n, i, s = b[t.requestId];
                                            if (s) {
                                                t.originalCpm = t.cpm,
                                                    t.originalCurrency = t.currency,
                                                    t.meta = t.meta || o({}, t[s.bidder]);
                                                var u = o(Object(f.a)(v.a.STATUS.GOOD, s), t);
                                                n = s.adUnitCode,
                                                    i = u,
                                                    h[n] = !0,
                                                    c(n, i, [r]) && a(n, i)
                                            } else
                                                Object(T.logWarn)("Bidder ".concat(e.code, " made bid for unknown request ID: ").concat(t.requestId, ". Ignoring."))
                                        }
                                        d(e.code);
                                        try {
                                            n = JSON.parse(n)
                                        } catch (e) { }
                                        var u;
                                        n = {
                                            body: n,
                                            headers: {
                                                get: i.getResponseHeader.bind(i)
                                            }
                                        },
                                            g.push(n);
                                        try {
                                            u = e.interpretResponse(n, t)
                                        } catch (t) {
                                            return Object(T.logError)("Bidder ".concat(e.code, " failed to interpret the server's response. Continuing without bids"), null, t),
                                                void w()
                                        }
                                        u && (Object(T.isArray)(u) ? u.forEach(s) : s(u)),
                                            w(u)
                                    }
                                    function s(t) {
                                        d(e.code),
                                            Object(T.logError)("Server call for ".concat(e.code, " failed: ").concat(t, ". Continuing without bids.")),
                                            w()
                                    }
                                    switch (t.method) {
                                        case "GET":
                                            u("".concat(t.url).concat(function (e) {
                                                return e ? "?".concat("object" === i(e) ? Object(T.parseQueryStringParameters)(e) : e) : ""
                                            }(t.data)), {
                                                success: l(n),
                                                error: s
                                            }, void 0, o({
                                                method: "GET",
                                                withCredentials: !0
                                            }, t.options));
                                            break;
                                        case "POST":
                                            u(t.url, {
                                                success: l(n),
                                                error: s
                                            }, "string" == typeof t.data ? t.data : JSON.stringify(t.data), o({
                                                method: "POST",
                                                contentType: "text/plain",
                                                withCredentials: !0
                                            }, t.options));
                                            break;
                                        default:
                                            Object(T.logWarn)("Skipping invalid request from ".concat(e.code, ". Request type ").concat(t.type, " must be GET or POST")),
                                                w()
                                    }
                                })
                            } else
                                p()
                        } else
                            p()
                    }
                }
            })
        }
        function s(e, t) {
            return l.b.getConfig("adpod.brandCategoryExclusion") ? (t.filter(function (e) {
                return Object(T.deepAccess)(e, "mediaTypes.video.context") === x.a
            }).map(function (e) {
                return e.bids.map(function (e) {
                    return e.bidder
                })
            }).reduce(T.flatten, []).filter(T.uniques).forEach(function (e) {
                var t = d.default.getBidAdapter(e);
                if (t.getSpec().getMappingFileInfo) {
                    var n = t.getSpec().getMappingFileInfo()
                        , r = n.refreshInDays ? n.refreshInDays : j
                        , i = n.localStorageKey ? n.localStorageKey : t.getSpec().code
                        , o = A.getDataFromLocalStorage(i);
                    try {
                        (!(o = o ? JSON.parse(o) : void 0) || Object(T.timestamp)() > o.lastUpdated + 24 * r * 60 * 60 * 1e3) && Object(C.a)(n.url, {
                            success: function (t) {
                                try {
                                    t = JSON.parse(t);
                                    var n = {
                                        lastUpdated: Object(T.timestamp)(),
                                        mapping: t.mapping
                                    };
                                    A.setDataInLocalStorage(i, JSON.stringify(n))
                                } catch (t) {
                                    Object(T.logError)("Failed to parse ".concat(e, " bidder translation mapping file"))
                                }
                            },
                            error: function () {
                                Object(T.logError)("Failed to load ".concat(e, " bidder translation file"))
                            }
                        })
                    } catch (t) {
                        Object(T.logError)("Failed to parse ".concat(e, " bidder translation mapping file"))
                    }
                }
            }),
                void e.call(this, t)) : e.call(this, t)
        }
        function c(e, t, n) {
            function i(e) {
                return "Invalid bid from ".concat(t.bidderCode, ". Ignoring bid: ").concat(e)
            }
            return e ? t ? (o = Object.keys(t),
                O.every(function (e) {
                    return w()(o, e) && !w()([void 0, null], t[e])
                }) ? "native" !== t.mediaType || Object(h.f)(t, n) ? "video" !== t.mediaType || Object(g.d)(t, n) ? !("banner" === t.mediaType && !function (e, t, n) {
                    if ((t.width || 0 === parseInt(t.width, 10)) && (t.height || 0 === parseInt(t.height, 10)))
                        return t.width = parseInt(t.width, 10),
                            t.height = parseInt(t.height, 10),
                            1;
                    var i = Object(T.getBidderRequest)(n, t.bidderCode, e)
                        , o = i && i.bids && i.bids[0] && i.bids[0].sizes
                        , a = Object(T.parseSizesInput)(o);
                    if (1 === a.length) {
                        var s = r(a[0].split("x"), 2)
                            , c = s[0]
                            , u = s[1];
                        return t.width = parseInt(c, 10),
                            t.height = parseInt(u, 10),
                            1
                    }
                }(e, t, n) && (Object(T.logError)(i("Banner bids require a width and height")),
                    1)) : (Object(T.logError)(i("Video bid does not have required vastUrl or renderer property")),
                        !1) : (Object(T.logError)(i("Native bid missing some required properties.")),
                            !1) : (Object(T.logError)(i("Bidder ".concat(t.bidderCode, " is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params."))),
                                !1)) : (Object(T.logWarn)("Some adapter tried to add an undefined bid for ".concat(e, ".")),
                                    !1) : (Object(T.logWarn)("No adUnitCode was supplied to addBidResponse."),
                                        !1);
            var o
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            n.d(t, "storage", function () {
                return A
            }),
            t.registerBidder = function (e) {
                function t(e) {
                    var t = a(e);
                    d.default.registerBidAdapter(t, e.code, n)
                }
                var n = Array.isArray(e.supportedMediaTypes) ? {
                    supportedMediaTypes: e.supportedMediaTypes
                } : void 0;
                t(e),
                    Array.isArray(e.aliases) && e.aliases.forEach(function (n) {
                        var r, i = n;
                        Object(T.isPlainObject)(n) && (i = n.code,
                            r = n.gvlid),
                            d.default.aliasRegistry[i] = e.code,
                            t(o({}, e, {
                                code: i,
                                gvlid: r
                            }))
                    })
            }
            ,
            t.newBidder = a,
            n.d(t, "registerSyncInner", function () {
                return k
            }),
            t.preloadBidderMappingFile = s,
            t.getIabSubCategory = function (e, t) {
                var n = d.default.getBidAdapter(e);
                if (n.getSpec().getMappingFileInfo) {
                    var r = n.getSpec().getMappingFileInfo()
                        , i = r.localStorageKey ? r.localStorageKey : n.getBidderCode()
                        , o = A.getDataFromLocalStorage(i);
                    if (o) {
                        try {
                            o = JSON.parse(o)
                        } catch (t) {
                            Object(T.logError)("Failed to parse ".concat(e, " mapping data stored in local storage"))
                        }
                        return o.mapping[t] ? o.mapping[t] : null
                    }
                }
            }
            ,
            t.isValid = c;
        var u = n(90)
            , d = n(9)
            , l = n(3)
            , f = n(34)
            , p = n(43)
            , h = n(37)
            , g = n(28)
            , m = n(5)
            , v = n.n(m)
            , b = n(8)
            , y = n.n(b)
            , S = n(12)
            , w = n.n(S)
            , C = n(4)
            , T = n(0)
            , x = n(2)
            , E = n(13)
            , I = n(7)
            , A = Object(I.a)("bidderFactory")
            , O = ["requestId", "cpm", "ttl", "creativeId", "netRevenue", "currency"]
            , j = 1
            , k = Object(E.b)("async", function (e, t, n, r) {
                var i = l.b.getConfig("userSync.aliasSyncEnabled");
                if (e.getUserSyncs && (i || !d.default.aliasRegistry[e.code])) {
                    var o = l.b.getConfig("userSync.filterSettings")
                        , a = e.getUserSyncs({
                            iframeEnabled: !(!o || !o.iframe && !o.all),
                            pixelEnabled: !(!o || !o.image && !o.all)
                        }, t, n, r);
                    a && (Array.isArray(a) || (a = [a]),
                        a.forEach(function (t) {
                            p.a.registerSync(t.type, e.code, t.url)
                        }))
                }
            }, "registerSyncs");
        Object(E.a)("checkAdUnitSetup").before(s)
    },
    10: function (e, t, n) {
        var r = n(96);
        e.exports = r
    },
    100: function (e, t, n) {
        function r(e, t) {
            var n = s[a(e)];
            return n == u || n != c && ("function" == typeof t ? i(t) : !!t)
        }
        var i = n(30)
            , o = /#|\.prototype\./
            , a = r.normalize = function (e) {
                return String(e).replace(o, ".").toLowerCase()
            }
            , s = r.data = {}
            , c = r.NATIVE = "N"
            , u = r.POLYFILL = "P";
        e.exports = r
    },
    101: function (e, t, n) {
        var r = n(25)
            , i = n(102)
            , o = n(19)("species");
        e.exports = function (e, t) {
            var n;
            return i(e) && ("function" == typeof (n = e.constructor) && (n === Array || i(n.prototype)) || r(n) && null === (n = n[o])) && (n = void 0),
                new (void 0 === n ? Array : n)(0 === t ? 0 : t)
        }
    },
    102: function (e, t, n) {
        var r = n(48);
        e.exports = Array.isArray || function (e) {
            return "Array" == r(e)
        }
    },
    103: function (e, t, n) {
        var r = n(24)
            , i = n(31);
        e.exports = function (e, t) {
            try {
                i(r, e, t)
            } catch (n) {
                r[e] = t
            }
            return t
        }
    },
    104: function (e, t, n) {
        var r = n(75);
        e.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
    },
    105: function (e, t, n) {
        n(106);
        var r = n(52);
        e.exports = r("Array", "includes")
    },
    106: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(76).includes
            , o = n(51);
        r({
            target: "Array",
            proto: !0,
            forced: !n(60)("indexOf", {
                ACCESSORS: !0,
                1: 0
            })
        }, {
            includes: function (e, t) {
                return i(this, e, 1 < arguments.length ? t : void 0)
            }
        }),
            o("includes")
    },
    107: function (e, t, n) {
        var r = n(58)
            , i = Math.max
            , o = Math.min;
        e.exports = function (e, t) {
            var n = r(e);
            return n < 0 ? i(n + t, 0) : o(n, t)
        }
    },
    108: function (e, t, n) {
        n(109),
            n(126),
            n(87),
            n(128);
        var r = n(42);
        e.exports = r.Set
    },
    109: function (e, t, n) {
        "use strict";
        var r = n(110)
            , i = n(115);
        e.exports = r("Set", function (e) {
            return function (t) {
                return e(this, arguments.length ? t : void 0)
            }
        }, i)
    },
    11: function (e, t, n) {
        "use strict";
        function r(e) {
            var t = this
                , n = e.url
                , r = e.config
                , a = e.id
                , u = e.callback
                , d = e.loaded
                , l = e.adUnitCode;
            this.url = n,
                this.config = r,
                this.handlers = {},
                this.id = a,
                this.loaded = d,
                this.cmd = [],
                this.push = function (e) {
                    "function" == typeof e ? t.loaded ? e.call() : t.cmd.push(e) : o.logError("Commands given to Renderer.push must be wrapped in a function")
                }
                ,
                this.callback = u || function () {
                    t.loaded = !0,
                        t.process()
                }
                ,
                this.render = function () {
                    var e, t, r;
                    e = l,
                        t = pbjs.adUnits,
                        !((r = s()(t, function (t) {
                            return t.code === e
                        })) && r.renderer && r.renderer.url && r.renderer.render) || o.isBoolean(r.renderer.backupOnly) && r.renderer.backupOnly ? Object(i.a)(n, c, this.callback) : o.logWarn("External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ".concat(l)),
                        this._render ? this._render.apply(this, arguments) : o.logWarn("No render function was provided, please use .setRender on the renderer");
                }
                    .bind(this)
        }
        t.a = r,
            t.c = function (e) {
                return !(!e || !e.url)
            }
            ,
            t.b = function (e, t) {
                e.render(t)
            }
            ;
        var i = n(40)
            , o = n(0)
            , a = n(10)
            , s = n.n(a)
            , c = "outstream";
        r.install = function (e) {
            return new r({
                url: e.url,
                config: e.config,
                id: e.id,
                callback: e.callback,
                loaded: e.loaded,
                adUnitCode: e.adUnitCode
            })
        }
            ,
            r.prototype.getConfig = function () {
                return this.config
            }
            ,
            r.prototype.setRender = function (e) {
                this._render = e
            }
            ,
            r.prototype.setEventHandlers = function (e) {
                this.handlers = e
            }
            ,
            r.prototype.handleVideoEvent = function (e) {
                var t = e.id
                    , n = e.eventName;
                "function" == typeof this.handlers[n] && this.handlers[n](),
                    o.logMessage("Prebid Renderer event for id ".concat(t, " type ").concat(n))
            }
            ,
            r.prototype.process = function () {
                for (; 0 < this.cmd.length;)
                    try {
                        this.cmd.shift().call()
                    } catch (e) {
                        o.logError("Error processing Renderer command: ", e)
                    }
            }
    },
    110: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(24)
            , o = n(78)
            , a = n(30)
            , s = n(31)
            , c = n(17)
            , u = n(81)
            , d = n(25)
            , l = n(64)
            , f = n(33).f
            , p = n(56).forEach
            , h = n(29)
            , g = n(54)
            , m = g.set
            , v = g.getterFor;
        e.exports = function (e, t, n) {
            var g, b = -1 !== e.indexOf("Map"), y = -1 !== e.indexOf("Weak"), S = b ? "set" : "add", w = i[e], C = w && w.prototype, T = {};
            if (h && "function" == typeof w && (y || C.forEach && !a(function () {
                (new w).entries().next()
            }))) {
                g = t(function (t, n) {
                    m(u(t, g, e), {
                        type: e,
                        collection: new w
                    }),
                        null != n && c(n, t[S], t, b)
                });
                var x = v(e);
                p(["add", "clear", "delete", "forEach", "get", "has", "set", "keys", "values", "entries"], function (e) {
                    var t = "add" == e || "set" == e;
                    e in C && (!y || "clear" != e) && s(g.prototype, e, function (n, r) {
                        var i = x(this).collection;
                        if (!t && y && !d(n))
                            return "get" == e && void 0;
                        var o = i[e](0 === n ? 0 : n, r);
                        return t ? this : o
                    })
                }),
                    y || f(g.prototype, "size", {
                        configurable: !0,
                        get: function () {
                            return x(this).collection.size
                        }
                    })
            } else
                g = n.getConstructor(t, e, b, S),
                    o.REQUIRED = !0;
            return l(g, e, !1, !0),
                T[e] = g,
                r({
                    global: !0,
                    forced: !0
                }, T),
                y || n.setStrong(g, e, b),
                g
        }
    },
    111: function (e, t, n) {
        var r = n(30);
        e.exports = !r(function () {
            return Object.isExtensible(Object.preventExtensions({}))
        })
    },
    112: function (e, t, n) {
        "use strict";
        var r = n(63)
            , i = n(62);
        e.exports = r ? {}.toString : function () {
            return "[object " + i(this) + "]"
        }
    },
    113: function (e, t, n) {
        var r = n(24)
            , i = n(114)
            , o = r.WeakMap;
        e.exports = "function" == typeof o && /native code/.test(i(o))
    },
    114: function (e, t, n) {
        var r = n(74)
            , i = Function.toString;
        "function" != typeof r.inspectSource && (r.inspectSource = function (e) {
            return i.call(e)
        }
        ),
            e.exports = r.inspectSource
    },
    115: function (e, t, n) {
        "use strict";
        var r = n(33).f
            , i = n(82)
            , o = n(120)
            , a = n(22)
            , s = n(81)
            , c = n(17)
            , u = n(66)
            , d = n(125)
            , l = n(29)
            , f = n(78).fastKey
            , p = n(54)
            , h = p.set
            , g = p.getterFor;
        e.exports = {
            getConstructor: function (e, t, n, u) {
                function d(e, t, n) {
                    var r, i, o = m(e), a = v(e, t);
                    return a ? a.value = n : (o.last = a = {
                        index: i = f(t, !0),
                        key: t,
                        value: n,
                        previous: r = o.last,
                        next: void 0,
                        removed: !1
                    },
                        o.first || (o.first = a),
                        r && (r.next = a),
                        l ? o.size++ : e.size++,
                        "F" !== i && (o.index[i] = a)),
                        e
                }
                var p = e(function (e, r) {
                    s(e, p, t),
                        h(e, {
                            type: t,
                            index: i(null),
                            first: void 0,
                            last: void 0,
                            size: 0
                        }),
                        l || (e.size = 0),
                        null != r && c(r, e[u], e, n)
                })
                    , m = g(t)
                    , v = function (e, t) {
                        var n, r = m(e), i = f(t);
                        if ("F" !== i)
                            return r.index[i];
                        for (n = r.first; n; n = n.next)
                            if (n.key == t)
                                return n
                    };
                return o(p.prototype, {
                    clear: function () {
                        for (var e = m(this), t = e.index, n = e.first; n;)
                            n.removed = !0,
                                n.previous && (n.previous = n.previous.next = void 0),
                                delete t[n.index],
                                n = n.next;
                        e.first = e.last = void 0,
                            l ? e.size = 0 : this.size = 0
                    },
                    delete: function (e) {
                        var t = m(this)
                            , n = v(this, e);
                        if (n) {
                            var r = n.next
                                , i = n.previous;
                            delete t.index[n.index],
                                n.removed = !0,
                                i && (i.next = r),
                                r && (r.previous = i),
                                t.first == n && (t.first = r),
                                t.last == n && (t.last = i),
                                l ? t.size-- : this.size--
                        }
                        return !!n
                    },
                    forEach: function (e, t) {
                        for (var n, r = m(this), i = a(e, 1 < arguments.length ? t : void 0, 3); n = n ? n.next : r.first;)
                            for (i(n.value, n.key, this); n && n.removed;)
                                n = n.previous
                    },
                    has: function (e) {
                        return !!v(this, e)
                    }
                }),
                    o(p.prototype, n ? {
                        get: function (e) {
                            var t = v(this, e);
                            return t && t.value
                        },
                        set: function (e, t) {
                            return d(this, 0 === e ? 0 : e, t)
                        }
                    } : {
                        add: function (e) {
                            return d(this, e = 0 === e ? 0 : e, e)
                        }
                    }),
                    l && r(p.prototype, "size", {
                        get: function () {
                            return m(this).size
                        }
                    }),
                    p
            },
            setStrong: function (e, t, n) {
                var r = t + " Iterator"
                    , i = g(t)
                    , o = g(r);
                u(e, t, function (e, t) {
                    h(this, {
                        type: r,
                        target: e,
                        state: i(e),
                        kind: t,
                        last: void 0
                    })
                }, function () {
                    for (var e = o(this), t = e.kind, n = e.last; n && n.removed;)
                        n = n.previous;
                    return e.target && (e.last = n = n ? n.next : e.state.first) ? "keys" == t ? {
                        value: n.key,
                        done: !1
                    } : "values" == t ? {
                        value: n.value,
                        done: !1
                    } : {
                        value: [n.key, n.value],
                        done: !1
                    } : {
                        value: e.target = void 0,
                        done: !0
                    }
                }, n ? "entries" : "values", !n, !0),
                    d(t)
            }
        }
    },
    116: function (e, t, n) {
        var r = n(29)
            , i = n(33)
            , o = n(15)
            , a = n(117);
        e.exports = r ? Object.defineProperties : function (e, t) {
            o(e);
            for (var n, r = a(t), s = r.length, c = 0; c < s;)
                i.f(e, n = r[c++], t[n]);
            return e
        }
    },
    117: function (e, t, n) {
        var r = n(118)
            , i = n(83);
        e.exports = Object.keys || function (e) {
            return r(e, i)
        }
    },
    118: function (e, t, n) {
        var r = n(26)
            , i = n(47)
            , o = n(76).indexOf
            , a = n(53);
        e.exports = function (e, t) {
            var n, s = i(e), c = 0, u = [];
            for (n in s)
                !r(a, n) && r(s, n) && u.push(n);
            for (; t.length > c;)
                r(s, n = t[c++]) && (~o(u, n) || u.push(n));
            return u
        }
    },
    119: function (e, t, n) {
        var r = n(27);
        e.exports = r("document", "documentElement")
    },
    12: function (e, t, n) {
        var r = n(105);
        e.exports = r
    },
    120: function (e, t, n) {
        var r = n(84);
        e.exports = function (e, t, n) {
            for (var i in t)
                n && n.unsafe && e[i] ? e[i] = t[i] : r(e, i, t[i], n);
            return e
        }
    },
    121: function (e, t, n) {
        "use strict";
        function r() {
            return this
        }
        var i = n(85).IteratorPrototype
            , o = n(82)
            , a = n(46)
            , s = n(64)
            , c = n(38);
        e.exports = function (e, t, n) {
            var u = t + " Iterator";
            return e.prototype = o(i, {
                next: a(1, n)
            }),
                s(e, u, !1, !0),
                c[u] = r,
                e
        }
    },
    122: function (e, t, n) {
        var r = n(30);
        e.exports = !r(function () {
            function e() { }
            return e.prototype.constructor = null,
                Object.getPrototypeOf(new e) !== e.prototype
        })
    },
    123: function (e, t, n) {
        var r = n(15)
            , i = n(124);
        e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
            var e, t = !1, n = {};
            try {
                (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []),
                    t = n instanceof Array
            } catch (e) { }
            return function (n, o) {
                return r(n),
                    i(o),
                    t ? e.call(n, o) : n.__proto__ = o,
                    n
            }
        }() : void 0)
    },
    124: function (e, t, n) {
        var r = n(25);
        e.exports = function (e) {
            if (!r(e) && null !== e)
                throw TypeError("Can't set " + String(e) + " as a prototype");
            return e
        }
    },
    125: function (e, t, n) {
        "use strict";
        var r = n(27)
            , i = n(33)
            , o = n(19)
            , a = n(29)
            , s = o("species");
        e.exports = function (e) {
            var t = r(e)
                , n = i.f;
            a && t && !t[s] && n(t, s, {
                configurable: !0,
                get: function () {
                    return this
                }
            })
        }
    },
    126: function (e, t) { },
    127: function (e, t, n) {
        function r(e) {
            return function (t, n) {
                var r, a, s = String(o(t)), c = i(n), u = s.length;
                return c < 0 || u <= c ? e ? "" : void 0 : (r = s.charCodeAt(c)) < 55296 || 56319 < r || c + 1 === u || (a = s.charCodeAt(c + 1)) < 56320 || 57343 < a ? e ? s.charAt(c) : r : e ? s.slice(c, c + 2) : a - 56320 + (r - 55296 << 10) + 65536
            }
        }
        var i = n(58)
            , o = n(49);
        e.exports = {
            codeAt: r(!1),
            charAt: r(!0)
        }
    },
    128: function (e, t, n) {
        n(129);
        var r = n(130)
            , i = n(24)
            , o = n(62)
            , a = n(31)
            , s = n(38)
            , c = n(19)("toStringTag");
        for (var u in r) {
            var d = i[u]
                , l = d && d.prototype;
            l && o(l) !== c && a(l, c, u),
                s[u] = s.Array
        }
    },
    129: function (e, t, n) {
        "use strict";
        var r = n(47)
            , i = n(51)
            , o = n(38)
            , a = n(54)
            , s = n(66)
            , c = "Array Iterator"
            , u = a.set
            , d = a.getterFor(c);
        e.exports = s(Array, "Array", function (e, t) {
            u(this, {
                type: c,
                target: r(e),
                index: 0,
                kind: t
            })
        }, function () {
            var e = d(this)
                , t = e.target
                , n = e.kind
                , r = e.index++;
            return !t || r >= t.length ? {
                value: e.target = void 0,
                done: !0
            } : "keys" == n ? {
                value: r,
                done: !1
            } : "values" == n ? {
                value: t[r],
                done: !1
            } : {
                value: [r, t[r]],
                done: !1
            }
        }, "values"),
            o.Arguments = o.Array,
            i("keys"),
            i("values"),
            i("entries")
    },
    13: function (e, t, n) {
        "use strict";
        n.d(t, "b", function () {
            return o
        }),
            n.d(t, "a", function () {
                return a
            }),
            t.d = function (e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 15;
                0 === e.getHooks({
                    hook: t
                }).length && e.before(t, n)
            }
            ,
            t.c = function (e, t) {
                o("async", function (e) {
                    e.forEach(function (e) {
                        return t.apply(void 0, function (e) {
                            if (Array.isArray(e)) {
                                for (var t = 0, n = new Array(e.length); t < e.length; t++)
                                    n[t] = e[t];
                                return n
                            }
                        }(n = e) || function (e) {
                            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
                                return Array.from(e)
                        }(n) || function () {
                            throw new TypeError("Invalid attempt to spread non-iterable instance")
                        }());
                        var n
                    })
                }, e)([])
            }
            ,
            t.e = function (e) {
                for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++)
                    n[r - 1] = arguments[r];
                a(e).before(function (e, t) {
                    t.push(n),
                        e(t)
                })
            }
            ;
        var r = n(161)
            , i = n.n(r)
            , o = i()({
                ready: i.a.SYNC | i.a.ASYNC | i.a.QUEUE
            })
            , a = o.get
    },
    130: function (e, t) {
        e.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }
    },
    131: function (e, t, n) {
        n(14)({
            target: "Set",
            stat: !0
        }, {
            from: n(132)
        })
    },
    132: function (e, t, n) {
        "use strict";
        var r = n(18)
            , i = n(22)
            , o = n(17);
        e.exports = function (e, t, n) {
            var a, s, c, u, d = arguments.length, l = 1 < d ? t : void 0;
            return r(this),
                (a = void 0 !== l) && r(l),
                null == e ? new this : (s = [],
                    a ? (c = 0,
                        u = i(l, 2 < d ? n : void 0, 2),
                        o(e, function (e) {
                            s.push(u(e, c++))
                        })) : o(e, s.push, s),
                    new this(s))
        }
    },
    133: function (e, t, n) {
        n(14)({
            target: "Set",
            stat: !0
        }, {
            of: n(134)
        })
    },
    134: function (e, t, n) {
        "use strict";
        e.exports = function () {
            for (var e = arguments.length, t = new Array(e); e--;)
                t[e] = arguments[e];
            return new this(t)
        }
    },
    135: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(136);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            addAll: function () {
                return o.apply(this, arguments)
            }
        })
    },
    136: function (e, t, n) {
        "use strict";
        var r = n(15)
            , i = n(18);
        e.exports = function () {
            for (var e = r(this), t = i(e.add), n = 0, o = arguments.length; n < o; n++)
                t.call(e, arguments[n]);
            return e
        }
    },
    137: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(138);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            deleteAll: function () {
                return o.apply(this, arguments)
            }
        })
    },
    138: function (e, t, n) {
        "use strict";
        var r = n(15)
            , i = n(18);
        e.exports = function () {
            for (var e, t = r(this), n = i(t.delete), o = !0, a = 0, s = arguments.length; a < s; a++)
                e = n.call(t, arguments[a]),
                    o = o && e;
            return !!o
        }
    },
    139: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(22)
            , s = n(36)
            , c = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            every: function (e, t) {
                var n = o(this)
                    , r = s(n)
                    , i = a(e, 1 < arguments.length ? t : void 0, 3);
                return !c(r, function (e) {
                    if (!i(e, e, n))
                        return c.stop()
                }, void 0, !1, !0).stopped
            }
        })
    },
    14: function (e, t, n) {
        "use strict";
        function r(e) {
            function t(t, n, r) {
                if (this instanceof e) {
                    switch (arguments.length) {
                        case 0:
                            return new e;
                        case 1:
                            return new e(t);
                        case 2:
                            return new e(t, n)
                    }
                    return new e(t, n, r)
                }
                return e.apply(this, arguments)
            }
            return t.prototype = e.prototype,
                t
        }
        var i = n(24)
            , o = n(98).f
            , a = n(100)
            , s = n(42)
            , c = n(22)
            , u = n(31)
            , d = n(26);
        e.exports = function (e, t) {
            var n, l, f, p, h, g, m, v, b = e.target, y = e.global, S = e.stat, w = e.proto, C = y ? i : S ? i[b] : (i[b] || {}).prototype, T = y ? s : s[b] || (s[b] = {}), x = T.prototype;
            for (f in t)
                n = !a(y ? f : b + (S ? "." : "#") + f, e.forced) && C && d(C, f),
                    h = T[f],
                    n && (g = e.noTargetGet ? (v = o(C, f)) && v.value : C[f]),
                    p = n && g ? g : t[f],
                    n && typeof h == typeof p || (m = e.bind && n ? c(p, i) : e.wrap && n ? r(p) : w && "function" == typeof p ? c(Function.call, p) : p,
                        (e.sham || p && p.sham || h && h.sham) && u(m, "sham", !0),
                        T[f] = m,
                        w && (d(s, l = b + "Prototype") || u(s, l, {}),
                            s[l][f] = p,
                            e.real && x && !x[f] && u(x, f, p)))
        }
    },
    140: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(39)
            , u = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            difference: function (e) {
                var t = a(this)
                    , n = new (c(t, o("Set")))(t)
                    , r = s(n.delete);
                return u(e, function (e) {
                    r.call(n, e)
                }),
                    n
            }
        })
    },
    141: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(22)
            , u = n(39)
            , d = n(36)
            , l = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            filter: function (e, t) {
                var n = a(this)
                    , r = d(n)
                    , i = c(e, 1 < arguments.length ? t : void 0, 3)
                    , f = new (u(n, o("Set")))
                    , p = s(f.add);
                return l(r, function (e) {
                    i(e, e, n) && p.call(f, e)
                }, void 0, !1, !0),
                    f
            }
        })
    },
    142: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(22)
            , s = n(36)
            , c = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            find: function (e, t) {
                var n = o(this)
                    , r = s(n)
                    , i = a(e, 1 < arguments.length ? t : void 0, 3);
                return c(r, function (e) {
                    if (i(e, e, n))
                        return c.stop(e)
                }, void 0, !1, !0).result
            }
        })
    },
    143: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(39)
            , u = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            intersection: function (e) {
                var t = a(this)
                    , n = new (c(t, o("Set")))
                    , r = s(t.has)
                    , i = s(n.add);
                return u(e, function (e) {
                    r.call(t, e) && i.call(n, e)
                }),
                    n
            }
        })
    },
    144: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(18)
            , s = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            isDisjointFrom: function (e) {
                var t = o(this)
                    , n = a(t.has);
                return !s(e, function (e) {
                    if (!0 === n.call(t, e))
                        return s.stop()
                }).stopped
            }
        })
    },
    145: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(88)
            , u = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            isSubsetOf: function (e) {
                var t = c(this)
                    , n = a(e)
                    , r = n.has;
                return "function" != typeof r && (n = new (o("Set"))(e),
                    r = s(n.has)),
                    !u(t, function (e) {
                        if (!1 === r.call(n, e))
                            return u.stop()
                    }, void 0, !1, !0).stopped
            }
        })
    },
    146: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(18)
            , s = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            isSupersetOf: function (e) {
                var t = o(this)
                    , n = a(t.has);
                return !s(e, function (e) {
                    if (!1 === n.call(t, e))
                        return s.stop()
                }).stopped
            }
        })
    },
    147: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(36)
            , s = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            join: function (e) {
                var t = o(this)
                    , n = a(t)
                    , r = void 0 === e ? "," : String(e)
                    , i = [];
                return s(n, i.push, i, !1, !0),
                    i.join(r)
            }
        })
    },
    148: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(22)
            , u = n(39)
            , d = n(36)
            , l = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            map: function (e, t) {
                var n = a(this)
                    , r = d(n)
                    , i = c(e, 1 < arguments.length ? t : void 0, 3)
                    , f = new (u(n, o("Set")))
                    , p = s(f.add);
                return l(r, function (e) {
                    p.call(f, i(e, e, n))
                }, void 0, !1, !0),
                    f
            }
        })
    },
    149: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(18)
            , s = n(36)
            , c = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            reduce: function (e, t) {
                var n = o(this)
                    , r = s(n)
                    , i = arguments.length < 2
                    , u = i ? void 0 : t;
                if (a(e),
                    c(r, function (t) {
                        u = i ? (i = !1,
                            t) : e(u, t, t, n)
                    }, void 0, !1, !0),
                    i)
                    throw TypeError("Reduce of empty set with no initial value");
                return u
            }
        })
    },
    15: function (e, t, n) {
        var r = n(25);
        e.exports = function (e) {
            if (!r(e))
                throw TypeError(String(e) + " is not an object");
            return e
        }
    },
    150: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(15)
            , a = n(22)
            , s = n(36)
            , c = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            some: function (e, t) {
                var n = o(this)
                    , r = s(n)
                    , i = a(e, 1 < arguments.length ? t : void 0, 3);
                return c(r, function (e) {
                    if (i(e, e, n))
                        return c.stop()
                }, void 0, !1, !0).stopped
            }
        })
    },
    151: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(39)
            , u = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            symmetricDifference: function (e) {
                var t = a(this)
                    , n = new (c(t, o("Set")))(t)
                    , r = s(n.delete)
                    , i = s(n.add);
                return u(e, function (e) {
                    r.call(n, e) || i.call(n, e)
                }),
                    n
            }
        })
    },
    152: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(16)
            , o = n(27)
            , a = n(15)
            , s = n(18)
            , c = n(39)
            , u = n(17);
        r({
            target: "Set",
            proto: !0,
            real: !0,
            forced: i
        }, {
            union: function (e) {
                var t = a(this)
                    , n = new (c(t, o("Set")))(t);
                return u(e, s(n.add), n),
                    n
            }
        })
    },
    153: function (e, t, n) {
        n(87),
            n(154);
        var r = n(42);
        e.exports = r.Array.from
    },
    154: function (e, t, n) {
        var r = n(14)
            , i = n(155);
        r({
            target: "Array",
            stat: !0,
            forced: !n(157)(function (e) {
                Array.from(e)
            })
        }, {
            from: i
        })
    },
    155: function (e, t, n) {
        "use strict";
        var r = n(22)
            , i = n(57)
            , o = n(80)
            , a = n(79)
            , s = n(50)
            , c = n(156)
            , u = n(61);
        e.exports = function (e, t, n) {
            var d, l, f, p, h, g, m = i(e), v = "function" == typeof this ? this : Array, b = arguments.length, y = 1 < b ? t : void 0, S = void 0 !== y, w = u(m), C = 0;
            if (S && (y = r(y, 2 < b ? n : void 0, 2)),
                null == w || v == Array && a(w))
                for (l = new v(d = s(m.length)); C < d; C++)
                    g = S ? y(m[C], C) : m[C],
                        c(l, C, g);
            else
                for (h = (p = w.call(m)).next,
                    l = new v; !(f = h.call(p)).done; C++)
                    g = S ? o(p, y, [f.value, C], !0) : f.value,
                        c(l, C, g);
            return l.length = C,
                l
        }
    },
    156: function (e, t, n) {
        "use strict";
        var r = n(55)
            , i = n(33)
            , o = n(46);
        e.exports = function (e, t, n) {
            var a = r(t);
            a in e ? i.f(e, a, o(0, n)) : e[a] = n
        }
    },
    157: function (e, t, n) {
        var r = n(19)("iterator")
            , i = !1;
        try {
            var o = 0
                , a = {
                    next: function () {
                        return {
                            done: !!o++
                        }
                    },
                    return: function () {
                        i = !0
                    }
                };
            a[r] = function () {
                return this
            }
                ,
                Array.from(a, function () {
                    throw 2
                })
        } catch (e) { }
        e.exports = function (e, t) {
            if (!t && !i)
                return !1;
            var n = !1;
            try {
                var o = {};
                o[r] = function () {
                    return {
                        next: function () {
                            return {
                                done: n = !0
                            }
                        }
                    }
                }
                    ,
                    e(o)
            } catch (e) { }
            return n
        }
    },
    158: function (e, t) {
        e.exports = function e(t) {
            var n = Array.isArray(t) ? [] : {};
            for (var r in t) {
                var i = t[r];
                n[r] = i && "object" == typeof i ? e(i) : i
            }
            return n
        }
    },
    159: function (e, t, n) {
        "use strict";
        t.a = function (e, t, n, r, i) {
            for (t = t.split ? t.split(".") : t,
                r = 0; r < t.length; r++)
                e = e ? e[t[r]] : i;
            return e === i ? n : e
        }
    },
    16: function (e, t) {
        e.exports = !0
    },
    160: function (e, t, n) {
        "use strict";
        t.a = function (e, t, n) {
            t.split && (t = t.split("."));
            for (var r, i = 0, o = t.length, a = e; i < o; ++i)
                r = a[t[i]],
                    a = a[t[i]] = i === o - 1 ? n : null != r ? r : !~t[i + 1].indexOf(".") && -1 < +t[i + 1] ? [] : {}
        }
    },
    161: function (e, t) {
        function n(e, t) {
            return Array.prototype.slice.call(e, t)
        }
        function r(e) {
            function t(e, t) {
                return "function" == typeof e ? l.call(null, "sync", e, t) : "string" == typeof e && "function" == typeof t ? l.apply(null, arguments) : "object" == typeof e ? function (e, t, n) {
                    var r = !0;
                    void 0 === t && (t = Object.getOwnPropertyNames(e),
                        r = !1);
                    for (var i = {}, o = ["constructor"]; (t = t.filter(function (t) {
                        return !("function" != typeof e[t] || -1 !== o.indexOf(t) || t.match(/^_/))
                    })).forEach(function (t) {
                        var r = t.split(":")
                            , o = r[0]
                            , a = r[1] || "sync";
                        if (!i[o]) {
                            var s = e[o];
                            i[o] = e[o] = l(a, s, n ? [n, o] : void 0)
                        }
                    }),
                        e = Object.getPrototypeOf(e),
                        r && e;)
                        ;
                    return i
                }
                    .apply(null, arguments) : void 0
            }
            function u(e) {
                var t = Array.isArray(e) ? e : e.split(".");
                return s.call(t, function (e, n, r) {
                    var i = e[n]
                        , o = !1;
                    return i || (r === t.length - 1 ? (f || h.push(function () { }),
                        e[n] = d(function (t) {
                            e[n] = t,
                                o = !0
                        })) : e[n] = {})
                }, p)
            }
            function d(e) {
                function t(e, t, o, a) {
                    var s = {
                        hook: o,
                        type: t,
                        priority: a || 10,
                        remove: function () {
                            var t = e.indexOf(s);
                            -1 !== t && (e.splice(t, 1),
                                i(n, r))
                        }
                    };
                    return e.push(s),
                        e.sort(function (e, t) {
                            return t.priority - e.priority
                        }),
                        i(n, r),
                        this
                }
                var n = []
                    , r = []
                    , i = function () { }
                    , o = {
                        before: function (e, r) {
                            return t.call(this, n, "before", e, r)
                        },
                        after: function (e, n) {
                            return t.call(this, r, "after", e, n)
                        },
                        getHooks: function (e) {
                            var t = n.concat(r);
                            return "object" == typeof e && (t = t.filter(function (t) {
                                return Object.keys(e).every(function (n) {
                                    return t[n] === e[n]
                                })
                            })),
                                c(t, {
                                    remove: function () {
                                        return t.forEach(function (e) {
                                            e.remove()
                                        }),
                                            this
                                    }
                                })
                        },
                        removeAll: function () {
                            return this.getHooks().remove()
                        }
                    }
                    , s = {
                        install: function (t, o, a) {
                            this.type = t,
                                (i = a)(n, r),
                                e && e(o)
                        }
                    };
                return a.set(o.after, s),
                    o
            }
            function l(t, o, s) {
                function l() {
                    !f && ("sync" !== t || e.ready & r.SYNC) && ("async" !== t || e.ready & r.ASYNC) ? "sync" !== t && e.ready & r.QUEUE ? b.apply = function () {
                        var e = arguments;
                        h.push(function () {
                            m.apply(e[1], e[2])
                        })
                    }
                        : b.apply = function () {
                            throw i + ": hooked function not ready"
                        }
                        : b.apply = g
                }
                var p = o.after && a.get(o.after);
                if (p) {
                    if (p.type !== t)
                        throw i + ": recreated hookable with different type";
                    return o
                }
                var g, m, v = s ? u(s) : d(), b = {
                    get: function (e, t) {
                        return v[t] || Reflect.get.apply(Reflect, arguments)
                    }
                };
                return f || h.push(l),
                    e.useProxy && "function" == typeof Proxy && Proxy.revocable ? m = new Proxy(o, b) : c(m = function () {
                        return b.apply ? b.apply(o, this, n(arguments)) : o.apply(this, arguments)
                    }
                        , v),
                    a.get(m.after).install(t, m, function (e, r) {
                        function i(e) {
                            a.push(e.hook)
                        }
                        var o, a = [];
                        g = e.length || r.length ? (e.forEach(i),
                            o = a.push(void 0) - 1,
                            r.forEach(i),
                            function (e, r, i) {
                                function s(e) {
                                    "sync" === t ? u = e : l && l.apply(null, arguments)
                                }
                                function c(e) {
                                    if (a[d]) {
                                        var i = n(arguments);
                                        return c.bail = s,
                                            i.unshift(c),
                                            a[d++].apply(r, i)
                                    }
                                    "sync" === t ? u = e : l && l.apply(null, arguments)
                                }
                                var u, d = 0, l = "async" === t && "function" == typeof i[i.length - 1] && i.pop();
                                return a[o] = function () {
                                    var i = n(arguments, 1);
                                    "async" === t && l && (delete c.bail,
                                        i.push(c));
                                    var o = e.apply(r, i);
                                    "sync" === t && c(o)
                                }
                                    ,
                                    c.apply(null, i),
                                    u
                            }
                        ) : void 0,
                            l()
                    }),
                    m
            }
            var f, p = {}, h = [];
            return (e = c({}, o, e)).ready ? t.ready = function () {
                f = !0,
                    function (e) {
                        for (var t; t = e.shift();)
                            t()
                    }(h)
            }
                : f = !0,
                t.get = u,
                t
        }
        r.SYNC = 1,
            r.ASYNC = 2,
            r.QUEUE = 4;
        var i = "fun-hooks"
            , o = Object.freeze({
                useProxy: !0,
                ready: 0
            })
            , a = new WeakMap
            , s = "2,1,0" === [1].reduce(function (e, t, n) {
                return [e, t, n]
            }, 2).toString() ? Array.prototype.reduce : function (e, t) {
                var n, r = Object(this), i = r.length >>> 0, o = 0;
                if (t)
                    n = t;
                else {
                    for (; o < i && !(o in r);)
                        o++;
                    n = r[o++]
                }
                for (; o < i;)
                    o in r && (n = e(n, r[o], o, r)),
                        o++;
                return n
            }
            , c = Object.assign || function (e) {
                return s.call(n(arguments, 1), function (e, t) {
                    return t && Object.keys(t).forEach(function (n) {
                        e[n] = t[n]
                    }),
                        e
                }, e)
            }
            ;
        e.exports = r
    },
    17: function (e, t, n) {
        function r(e, t) {
            this.stopped = e,
                this.result = t
        }
        var i = n(15)
            , o = n(79)
            , a = n(50)
            , s = n(22)
            , c = n(61)
            , u = n(80);
        (e.exports = function (e, t, n, d, l) {
            var f, p, h, g, m, v, b, y = s(t, n, d ? 2 : 1);
            if (l)
                f = e;
            else {
                if ("function" != typeof (p = c(e)))
                    throw TypeError("Target is not iterable");
                if (o(p)) {
                    for (h = 0,
                        g = a(e.length); h < g; h++)
                        if ((m = d ? y(i(b = e[h])[0], b[1]) : y(e[h])) && m instanceof r)
                            return m;
                    return new r((!1))
                }
                f = p.call(e)
            }
            for (v = f.next; !(b = v.call(f)).done;)
                if ("object" == typeof (m = u(f, y, b.value, d)) && m && m instanceof r)
                    return m;
            return new r((!1))
        }
        ).stop = function (e) {
            return new r((!0), e)
        }
    },
    18: function (e, t) {
        e.exports = function (e) {
            if ("function" != typeof e)
                throw TypeError(String(e) + " is not a function");
            return e
        }
    },
    19: function (e, t, n) {
        var r = n(24)
            , i = n(73)
            , o = n(26)
            , a = n(59)
            , s = n(75)
            , c = n(104)
            , u = i("wks")
            , d = r.Symbol
            , l = c ? d : d && d.withoutSetter || a;
        e.exports = function (e) {
            return o(u, e) || (s && o(d, e) ? u[e] = d[e] : u[e] = l("Symbol." + e)),
                u[e]
        }
    },
    2: function (e, t, n) {
        "use strict";
        n.d(t, "c", function () {
            return r
        }),
            n.d(t, "d", function () {
                return i
            }),
            n.d(t, "b", function () {
                return o
            }),
            n.d(t, "a", function () {
                return a
            });
        var r = "native"
            , i = "video"
            , o = "banner"
            , a = "adpod"
    },
    20: function (e, t, n) {
        "use strict";
        function r(e) {
            try {
                var t = e.querySelector("link[rel='canonical']");
                if (null !== t)
                    return t.href
            } catch (e) { }
            return null
        }
        n.d(t, "a", function () {
            return a
        });
        var i, o = n(0), a = (i = window,
            function () {
                var e, t, n, a = [], s = function (e) {
                    try {
                        if (!e.location.ancestorOrigins)
                            return;
                        return e.location.ancestorOrigins
                    } catch (e) { }
                }(i), c = !1, u = 0, d = !1, l = !1;
                do {
                    var f = e
                        , p = l
                        , h = void 0
                        , g = !1
                        , m = null;
                    l = !1,
                        e = e ? e.parent : i;
                    try {
                        h = e.location.href || null
                    } catch (e) {
                        g = !0
                    }
                    if (g)
                        if (p) {
                            var v = f.context;
                            try {
                                t = m = v.sourceUrl,
                                    d = !0,
                                    e === i.top && (c = !0),
                                    v.canonicalUrl && (n = v.canonicalUrl)
                            } catch (e) { }
                        } else {
                            Object(o.logWarn)("Trying to access cross domain iframe. Continuing without referrer and location");
                            try {
                                var b = f.document.referrer;
                                b && (m = b,
                                    e === i.top && (c = !0))
                            } catch (e) { }
                            !m && s && s[u - 1] && (m = s[u - 1]),
                                m && !d && (t = m)
                        }
                    else {
                        if (h && (t = m = h,
                            d = !1,
                            e === i.top)) {
                            c = !0;
                            var y = r(e.document);
                            y && (n = y)
                        }
                        e.context && e.context.sourceUrl && (l = !0)
                    }
                    a.push(m),
                        u++
                } while (e !== i.top);
                return a.reverse(),
                {
                    referer: t || null,
                    reachedTop: c,
                    isAmp: d,
                    numIframes: u - 1,
                    stack: a,
                    canonicalUrl: n || null
                }
            }
        )
    },
    21: function (e, t, n) {
        "use strict";
        t.a = function () {
            return window.pbjs
        }
            ,
            window.pbjs = window.pbjs || {},
            window.pbjs.cmd = window.pbjs.cmd || [],
            window.pbjs.que = window.pbjs.que || [],
            window._pbjsGlobals = window._pbjsGlobals || [],
            window._pbjsGlobals.push("pbjs")
    },
    219: function (e, t, n) {
        n(220);
        var r = n(52);
        e.exports = r("Array", "findIndex")
    },
    22: function (e, t, n) {
        var r = n(18);
        e.exports = function (e, t, n) {
            if (r(e),
                void 0 === t)
                return e;
            switch (n) {
                case 0:
                    return function () {
                        return e.call(t)
                    }
                        ;
                case 1:
                    return function (n) {
                        return e.call(t, n)
                    }
                        ;
                case 2:
                    return function (n, r) {
                        return e.call(t, n, r)
                    }
                        ;
                case 3:
                    return function (n, r, i) {
                        return e.call(t, n, r, i)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }
    },
    220: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(56).findIndex
            , o = n(51)
            , a = n(60)
            , s = "findIndex"
            , c = !0
            , u = a(s);
        s in [] && Array(1)[s](function () {
            c = !1
        }),
            r({
                target: "Array",
                proto: !0,
                forced: c || !u
            }, {
                findIndex: function (e, t) {
                    return i(this, e, 1 < arguments.length ? t : void 0)
                }
            }),
            o(s)
    },
    227: function (e, t, n) {
        "use strict";
        function r(e) {
            var t, n, r, i, s, d, p, m, v, b = e.message ? "message" : "data", y = {};
            try {
                y = JSON.parse(e[b])
            } catch (e) {
                return
            }
            if (y && y.adId) {
                var S = l()(u.a.getBidsReceived(), function (e) {
                    return e.adId === y.adId
                });
                if (S && "Prebid Request" === y.message && (n = e,
                    r = (t = S).adId,
                    i = t.ad,
                    s = t.adUrl,
                    d = t.width,
                    p = t.height,
                    m = t.renderer,
                    v = t.cpm,
                    Object(f.c)(m) ? Object(f.b)(m, t) : r && (function (e) {
                        function t(e) {
                            var t, i, o = (t = n,
                                i = r,
                                window.googletag ? function (e) {
                                    return l()(window.googletag.pubads().getSlots(), function (t) {
                                        return l()(t.getTargetingKeys(), function (n) {
                                            return h()(t.getTargeting(n), e)
                                        })
                                    }).getSlotElementId()
                                }(t) : window.apntag ? function (e) {
                                    var t = window.apntag.getTag(e);
                                    return t && t.targetId
                                }(i) : i), a = document.getElementById(o);
                            return a && a.querySelector(e)
                        }
                        var n = e.adId
                            , r = e.adUnitCode
                            , i = e.width
                            , o = e.height;
                        ["div", "iframe"].forEach(function (e) {
                            var n = t(e + ':not([style*="display: none"])');
                            if (n) {
                                var a = n.style;
                                a.width = i + "px",
                                    a.height = o + "px"
                            } else
                                Object(c.logWarn)("Unable to locate matching page element for adUnitCode ".concat(r, ".  Can't resize it to ad's dimensions.  Please review setup."))
                        })
                    }(t),
                        n.source.postMessage(JSON.stringify({
                            message: "Prebid Response",
                            ad: Object(c.replaceAuctionPrice)(i, v),
                            adUrl: Object(c.replaceAuctionPrice)(s, v),
                            adId: r,
                            width: d,
                            height: p
                        }), n.origin)),
                    u.a.addWinningBid(S),
                    o.a.emit(g, S)),
                    S && "Prebid Native" === y.message) {
                    if ("assetRequest" === y.action) {
                        var w = Object(a.c)(y, S);
                        return void e.source.postMessage(JSON.stringify(w), e.origin)
                    }
                    if ("click" === Object(a.b)(y, S))
                        return;
                    u.a.addWinningBid(S),
                        o.a.emit(g, S)
                }
            }
        }
        t.a = function () {
            window.addEventListener("message", r, !1)
        }
            ;
        var i = n(8)
            , o = n.n(i)
            , a = n(37)
            , s = n(5)
            , c = (n.n(s),
                n(0))
            , u = n(23)
            , d = n(10)
            , l = n.n(d)
            , f = n(11)
            , p = n(12)
            , h = n.n(p)
            , g = s.EVENTS.BID_WON
    },
    228: function (e, t, n) {
        "use strict";
        function r(e) {
            Object(g.logMessage)("DEBUG: " + e)
        }
        function i(e) {
            Object(g.logWarn)("DEBUG: " + e)
        }
        function o(e) {
            f = function (e, t, n) {
                return u(this.bidders, n.bidderCode) ? void i("bidder '".concat(n.bidderCode, "' excluded from auction by bidder overrides")) : (Array.isArray(this.bids) && this.bids.forEach(function (e) {
                    c(e, n.bidderCode, t) || d(e, n, "bidder")
                }),
                    void e(t, n))
            }
                .bind(e),
                m.c.before(f, 5),
                p = function (e, t) {
                    var n = this
                        , r = t.filter(function (e) {
                            return !u(n.bidders, e.bidderCode) || (i("bidRequest '".concat(e.bidderCode, "' excluded from auction by bidder overrides")),
                                !1)
                        });
                    Array.isArray(n.bidRequests) && r.forEach(function (e) {
                        n.bidRequests.forEach(function (t) {
                            e.bids.forEach(function (n) {
                                c(t, e.bidderCode, n.adUnitCode) || d(t, n, "bidRequest")
                            })
                        })
                    }),
                        e(r)
                }
                    .bind(e),
                m.e.before(p, 5)
        }
        function a() {
            m.c.getHooks({
                hook: f
            }).remove(),
                m.e.getHooks({
                    hook: p
                }).remove()
        }
        function s(e, t) {
            var n = 1 < arguments.length && void 0 !== t && t;
            h.b.setConfig({
                debug: !0
            }),
                a(),
                o(e),
                r("bidder overrides enabled".concat(n ? " from session" : ""))
        }
        function c(e, t, n) {
            return e.bidder && e.bidder !== t || !(!e.adUnitCode || e.adUnitCode === n)
        }
        function u(e, t) {
            return Array.isArray(e) && -1 === e.indexOf(t)
        }
        function d(e, t, n) {
            return Object.keys(e).filter(function (e) {
                return -1 === ["adUnitCode", "bidder"].indexOf(e)
            }).reduce(function (t, i) {
                return r("bidder overrides changed '".concat(t.adUnitCode, "/").concat(t.bidderCode, "' ").concat(n, ".").concat(i, " from '").concat(t[i], ".js' to '").concat(e[i], "'")),
                    t[i] = e[i],
                    t
            }, t)
        }
        function l(e) {
            if (e.enabled) {
                try {
                    window.sessionStorage.setItem(v, JSON.stringify(e))
                } catch (e) { }
                s(e)
            } else {
                a(),
                    r("bidder overrides disabled");
                try {
                    window.sessionStorage.removeItem(v)
                } catch (e) { }
            }
        }
        t.a = function (e) {
            var t;
            try {
                e = e || window.sessionStorage,
                    t = JSON.parse(e.getItem(v))
            } catch (e) { }
            t && s(t, !0)
        }
            ;
        var f, p, h = n(3), g = n(0), m = n(41), v = "pbjs:debugging";
        h.b.getConfig("debugging", function (e) {
            return l(e.debugging)
        })
    },
    23: function (e, t, n) {
        "use strict";
        n.d(t, "a", function () {
            return d
        });
        var r, i, o = n(0), a = n(41), s = n(10), c = n.n(s), u = n(5), d = (r = [],
            (i = {}).addWinningBid = function (e) {
                var t = c()(r, function (t) {
                    return t.getAuctionId() === e.auctionId
                });
                t ? (e.status = u.BID_STATUS.RENDERED,
                    t.addWinningBid(e)) : Object(o.logWarn)("Auction not found when adding winning bid")
            }
            ,
            i.getAllWinningBids = function () {
                return r.map(function (e) {
                    return e.getWinningBids()
                }).reduce(o.flatten, [])
            }
            ,
            i.getBidsRequested = function () {
                return r.map(function (e) {
                    return e.getBidRequests()
                }).reduce(o.flatten, [])
            }
            ,
            i.getNoBids = function () {
                return r.map(function (e) {
                    return e.getNoBids()
                }).reduce(o.flatten, [])
            }
            ,
            i.getBidsReceived = function () {
                return r.map(function (e) {
                    if (e.getAuctionStatus() === a.a)
                        return e.getBidsReceived()
                }).reduce(o.flatten, []).filter(function (e) {
                    return e
                })
            }
            ,
            i.getAdUnits = function () {
                return r.map(function (e) {
                    return e.getAdUnits()
                }).reduce(o.flatten, [])
            }
            ,
            i.getAdUnitCodes = function () {
                return r.map(function (e) {
                    return e.getAdUnitCodes()
                }).reduce(o.flatten, []).filter(o.uniques)
            }
            ,
            i.createAuction = function (e) {
                var t, n = e.adUnits, i = e.adUnitCodes, o = e.callback, s = e.cbTimeout, c = e.labels, u = e.auctionId, d = Object(a.k)({
                    adUnits: n,
                    adUnitCodes: i,
                    callback: o,
                    cbTimeout: s,
                    labels: c,
                    auctionId: u
                });
                return t = d,
                    r.push(t),
                    d
            }
            ,
            i.findBidByAdId = function (e) {
                return c()(r.map(function (e) {
                    return e.getBidsReceived()
                }).reduce(o.flatten, []), function (t) {
                    return t.adId === e
                })
            }
            ,
            i.getStandardBidderAdServerTargeting = function () {
                return Object(a.j)()[u.JSON_MAPPING.ADSERVER_TARGETING]
            }
            ,
            i.setStatusForBids = function (e, t) {
                var n = i.findBidByAdId(e);
                if (n && (n.status = t),
                    n && t === u.BID_STATUS.BID_TARGETING_SET) {
                    var o = c()(r, function (e) {
                        return e.getAuctionId() === n.auctionId
                    });
                    o && o.setBidTargeting(n)
                }
            }
            ,
            i.getLastAuctionId = function () {
                return r.length && r[r.length - 1].getAuctionId()
            }
            ,
            i)
    },
    24: function (e, t, n) {
        (function (t) {
            function n(e) {
                return e && e.Math == Math && e
            }
            e.exports = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof t && t) || Function("return this")()
        }
        ).call(t, n(35))
    },
    25: function (e, t) {
        e.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    },
    26: function (e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function (e, t) {
            return n.call(e, t)
        }
    },
    27: function (e, t, n) {
        function r(e) {
            return "function" == typeof e ? e : void 0
        }
        var i = n(42)
            , o = n(24);
        e.exports = function (e, t) {
            return arguments.length < 2 ? r(i[e]) || r(o[e]) : i[e] && i[e][t] || o[e] && o[e][t]
        }
    },
    28: function (e, t, n) {
        "use strict";
        n.d(t, "b", function () {
            return s
        }),
            n.d(t, "a", function () {
                return c
            }),
            t.d = function (e, t) {
                var n = Object(r.getBidRequest)(e.requestId, t)
                    , i = n && Object(r.deepAccess)(n, "mediaTypes.video")
                    , o = i && Object(r.deepAccess)(i, "context");
                return u(e, n, i, o)
            }
            ,
            n.d(t, "c", function () {
                return u
            }),
            n(9);
        var r = n(0)
            , i = n(3)
            , o = n(12)
            , a = (n.n(o),
                n(13))
            , s = "outstream"
            , c = "instream"
            , u = Object(a.b)("sync", function (e, t, n, o) {
                return !t || n && o !== s ? i.b.getConfig("cache.url") || !e.vastXml || e.vastUrl ? !(!e.vastUrl && !e.vastXml) : (Object(r.logError)('\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: "..."} });\n      '),
                    !1) : o !== s || !(!e.renderer && !t.renderer)
            }, "checkVideoBidSetup")
    },
    29: function (e, t, n) {
        var r = n(30);
        e.exports = !r(function () {
            return 7 != Object.defineProperty({}, 1, {
                get: function () {
                    return 7
                }
            })[1]
        })
    },
    3: function (e, t, n) {
        "use strict";
        function r() {
            return (r = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function i() {
            function e(e) {
                return d()(Object.keys(j), function (t) {
                    return e === j[t]
                })
            }
            function t(t) {
                if (t) {
                    if ("string" == typeof t)
                        e(t) || v.logWarn("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.");
                    else if (v.isPlainObject(t) && !Object(c.b)(t))
                        return void v.logError("Invalid custom price value passed to `setPriceGranularity()`");
                    return 1
                }
                v.logError("Prebid Error: no value passed to `setPriceGranularity()`")
            }
            T = {};
            var n = {
                _debug: y,
                get debug() {
                    return this._debug
                },
                set debug(e) {
                    this._debug = e
                },
                _bidderTimeout: 3e3,
                get bidderTimeout() {
                    return this._bidderTimeout
                },
                set bidderTimeout(e) {
                    this._bidderTimeout = e
                },
                _publisherDomain: S,
                get publisherDomain() {
                    return this._publisherDomain
                },
                set publisherDomain(e) {
                    this._publisherDomain = e
                },
                _priceGranularity: j.MEDIUM,
                set priceGranularity(n) {
                    t(n) && ("string" == typeof n ? this._priceGranularity = e(n) ? n : j.MEDIUM : v.isPlainObject(n) && (this._customPriceBucket = n,
                        this._priceGranularity = j.CUSTOM,
                        v.logMessage("Using custom price granularity")))
                },
                get priceGranularity() {
                    return this._priceGranularity
                },
                _customPriceBucket: {},
                get customPriceBucket() {
                    return this._customPriceBucket
                },
                _mediaTypePriceGranularity: {},
                get mediaTypePriceGranularity() {
                    return this._mediaTypePriceGranularity
                },
                set mediaTypePriceGranularity(n) {
                    var r = this;
                    this._mediaTypePriceGranularity = Object.keys(n).reduce(function (i, o) {
                        return t(n[o]) ? "string" == typeof n ? i[o] = e(n[o]) ? n[o] : r._priceGranularity : v.isPlainObject(n) && (i[o] = n[o],
                            v.logMessage("Using custom price granularity for ".concat(o))) : v.logWarn("Invalid price granularity for media type: ".concat(o)),
                            i
                    }, {})
                },
                _sendAllBids: !0,
                get enableSendAllBids() {
                    return this._sendAllBids
                },
                set enableSendAllBids(e) {
                    this._sendAllBids = e
                },
                _useBidCache: !1,
                get useBidCache() {
                    return this._useBidCache
                },
                set useBidCache(e) {
                    this._useBidCache = e
                },
                _deviceAccess: !0,
                get deviceAccess() {
                    return this._deviceAccess
                },
                set deviceAccess(e) {
                    this._deviceAccess = e
                },
                _bidderSequence: O,
                get bidderSequence() {
                    return this._bidderSequence
                },
                set bidderSequence(e) {
                    C[e] ? this._bidderSequence = e : v.logWarn("Invalid order: ".concat(e, ". Bidder Sequence was not set."))
                },
                _timeoutBuffer: 400,
                get timeoutBuffer() {
                    return this._timeoutBuffer
                },
                set timeoutBuffer(e) {
                    this._timeoutBuffer = e
                },
                _disableAjaxTimeout: !1,
                get disableAjaxTimeout() {
                    return this._disableAjaxTimeout
                },
                set disableAjaxTimeout(e) {
                    this._disableAjaxTimeout = e
                }
            };
            x && a(Object.keys(x).reduce(function (e, t) {
                return x[t] !== n[t] && (e[t] = n[t] || {}),
                    e
            }, {})),
                x = n,
                E = {}
        }
        function o() {
            if (A && E && v.isPlainObject(E[A])) {
                var e = E[A]
                    , t = new h.a(Object.keys(x).concat(Object.keys(e)));
                return m(t).reduce(function (t, n) {
                    return void 0 === e[n] ? t[n] = x[n] : void 0 !== x[n] && v.isPlainObject(e[n]) ? t[n] = Object(g.mergeDeep)({}, x[n], e[n]) : t[n] = e[n],
                        t
                }, {})
            }
            return r({}, x)
        }
        function a(e) {
            var t = Object.keys(e);
            I.filter(function (e) {
                return f()(t, e.topic)
            }).forEach(function (t) {
                var n, r, i;
                t.callback((n = {},
                    r = t.topic,
                    i = e[t.topic],
                    r in n ? Object.defineProperty(n, r, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : n[r] = i,
                    n))
            }),
                I.filter(function (e) {
                    return "*" === e.topic
                }).forEach(function (t) {
                    return t.callback(e)
                })
        }
        function s(e, t) {
            A = e;
            try {
                return t()
            } finally {
                A = null
            }
        }
        n.d(t, "a", function () {
            return w
        }),
            n.d(t, "b", function () {
                return k
            });
        var c = n(45)
            , u = n(10)
            , d = n.n(u)
            , l = n(12)
            , f = n.n(l)
            , p = n(77)
            , h = n.n(p)
            , g = n(0)
            , m = n(89)
            , v = n(0)
            , b = n(5)
            , y = "TRUE" === v.getParameterByName(b.DEBUG_MODE).toUpperCase()
            , S = window.location.origin
            , w = "random"
            , C = {};
        C[w] = !0,
            C.fixed = !0;
        var T, x, E, I, A, O = w, j = {
            LOW: "low",
            MEDIUM: "medium",
            HIGH: "high",
            AUTO: "auto",
            DENSE: "dense",
            CUSTOM: "custom"
        }, k = (I = [],
            A = null,
            i(),
        {
            getCurrentBidder: function () {
                return A
            },
            getConfig: function () {
                if (arguments.length <= 1 && "function" != typeof (arguments.length <= 0 ? void 0 : arguments[0])) {
                    var e = arguments.length <= 0 ? void 0 : arguments[0];
                    return e ? v.deepAccess(o(), e) : o()
                }
                return function (e, t) {
                    var n = t;
                    if ("string" != typeof e && (n = e,
                        e = "*"),
                        "function" == typeof n) {
                        var r = {
                            topic: e,
                            callback: n
                        };
                        return I.push(r),
                            function () {
                                I.splice(I.indexOf(r), 1)
                            }
                    }
                    v.logError("listener must be a function")
                }
                    .apply(void 0, arguments)
            },
            setConfig: function (e) {
                if (v.isPlainObject(e)) {
                    var t = Object.keys(e)
                        , n = {};
                    t.forEach(function (t) {
                        var i = e[t];
                        v.isPlainObject(T[t]) && v.isPlainObject(i) && (i = r({}, T[t], i)),
                            n[t] = x[t] = i
                    }),
                        a(n)
                } else
                    v.logError("setConfig options must be an object")
            },
            setDefaults: function (e) {
                v.isPlainObject(T) ? (r(T, e),
                    r(x, e)) : v.logError("defaults must be an object")
            },
            resetConfig: i,
            runWithBidder: s,
            callbackWithBidder: function (e) {
                return function (t) {
                    return function () {
                        if ("function" == typeof t) {
                            for (var n, r = arguments.length, i = new Array(r), o = 0; o < r; o++)
                                i[o] = arguments[o];
                            return s(e, (n = v.bind).call.apply(n, [t, this].concat(i)))
                        }
                        v.logWarn("config.callbackWithBidder callback is not a function")
                    }
                }
            },
            setBidderConfig: function (e) {
                try {
                    !function (e) {
                        if (!v.isPlainObject(e))
                            throw "setBidderConfig bidder options must be an object";
                        if (!Array.isArray(e.bidders) || !e.bidders.length)
                            throw "setBidderConfig bidder options must contain a bidders list with at least 1 bidder";
                        if (!v.isPlainObject(e.config))
                            throw "setBidderConfig bidder options must contain a config object"
                    }(e),
                        e.bidders.forEach(function (t) {
                            E[t] || (E[t] = {}),
                                Object.keys(e.config).forEach(function (n) {
                                    var i = e.config[n];
                                    v.isPlainObject(i) ? E[t][n] = r({}, E[t][n] || {}, i) : E[t][n] = i
                                })
                        })
                } catch (e) {
                    v.logError(e)
                }
            },
            getBidderConfig: function () {
                return E
            }
        })
    },
    30: function (e, t) {
        e.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    },
    31: function (e, t, n) {
        var r = n(29)
            , i = n(33)
            , o = n(46);
        e.exports = r ? function (e, t, n) {
            return i.f(e, t, o(1, n))
        }
            : function (e, t, n) {
                return e[t] = n,
                    e
            }
    },
    33: function (e, t, n) {
        var r = n(29)
            , i = n(71)
            , o = n(15)
            , a = n(55)
            , s = Object.defineProperty;
        t.f = r ? s : function (e, t, n) {
            if (o(e),
                t = a(t, !0),
                o(n),
                i)
                try {
                    return s(e, t, n)
                } catch (e) { }
            if ("get" in n || "set" in n)
                throw TypeError("Accessors not supported");
            return "value" in n && (e[t] = n.value),
                e
        }
    },
    34: function (e, t, n) {
        "use strict";
        function r(e, t) {
            var n = t && t.src || "client"
                , r = e || 0;
            this.bidderCode = t && t.bidder || "",
                this.width = 0,
                this.height = 0,
                this.statusMessage = function () {
                    switch (r) {
                        case 0:
                            return "Pending";
                        case 1:
                            return "Bid available";
                        case 2:
                            return "Bid returned empty or error response";
                        case 3:
                            return "Bid timed out"
                    }
                }(),
                this.adId = i.getUniqueIdentifierStr(),
                this.requestId = t && t.bidId,
                this.mediaType = "banner",
                this.source = n,
                this.getStatusCode = function () {
                    return r
                }
                ,
                this.getSize = function () {
                    return this.width + "x" + this.height
                }
        }
        t.a = function (e, t) {
            return new r(e, t)
        }
            ;
        var i = n(0)
    },
    35: function (vL, wL) {
        var xL;
        xL = function () {
            return this
        }();
        try {
            xL = xL || Function("return this")() || eval("this")
        } catch (e) {
            "object" == typeof window && (xL = window)
        }
        vL.exports = xL
    },
    353: function (e, t, n) {
        var r = n(354);
        e.exports = r
    },
    354: function (e, t, n) {
        n(355);
        var r = n(52);
        e.exports = r("String", "includes")
    },
    355: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(356)
            , o = n(49);
        r({
            target: "String",
            proto: !0,
            forced: !n(358)("includes")
        }, {
            includes: function (e, t) {
                return !!~String(o(this)).indexOf(i(e), 1 < arguments.length ? t : void 0)
            }
        })
    },
    356: function (e, t, n) {
        var r = n(357);
        e.exports = function (e) {
            if (r(e))
                throw TypeError("The method doesn't accept regular expressions");
            return e
        }
    },
    357: function (e, t, n) {
        var r = n(25)
            , i = n(48)
            , o = n(19)("match");
        e.exports = function (e) {
            var t;
            return r(e) && (void 0 !== (t = e[o]) ? !!t : "RegExp" == i(e))
        }
    },
    358: function (e, t, n) {
        var r = n(19)("match");
        e.exports = function (e) {
            var t = /./;
            try {
                "/./"[e](t)
            } catch (n) {
                try {
                    return t[r] = !1,
                        "/./"[e](t)
                } catch (e) { }
            }
            return !1
        }
    },
    36: function (e, t, n) {
        var r = n(16)
            , i = n(88);
        e.exports = r ? i : function (e) {
            return Set.prototype.values.call(e)
        }
    },
    37: function (e, t, n) {
        "use strict";
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function i(e) {
            return "object" === r(e) && e.url ? e.url : e
        }
        n.d(t, "e", function () {
            return u
        }),
            n.d(t, "a", function () {
                return d
            }),
            t.g = function (e) {
                return e && e.type && function (e) {
                    return e && s()(Object.keys(l), e) || (Object(o.logError)("".concat(e, " nativeParam is not supported")),
                        !1)
                }(e.type) ? l[e.type] : e
            }
            ,
            t.f = function (e, t) {
                var n = Object(o.getBidRequest)(e.requestId, t);
                if (!n)
                    return !1;
                if (!Object(o.deepAccess)(e, "native.clickUrl"))
                    return !1;
                if (Object(o.deepAccess)(e, "native.image") && (!Object(o.deepAccess)(e, "native.image.height") || !Object(o.deepAccess)(e, "native.image.width")))
                    return !1;
                if (Object(o.deepAccess)(e, "native.icon") && (!Object(o.deepAccess)(e, "native.icon.height") || !Object(o.deepAccess)(e, "native.icon.width")))
                    return !1;
                var r = n.nativeParams;
                if (!r)
                    return !0;
                var i = Object.keys(r).filter(function (e) {
                    return r[e].required
                })
                    , a = Object.keys(e.native).filter(function (t) {
                        return e.native[t]
                    });
                return i.every(function (e) {
                    return s()(a, e)
                })
            }
            ,
            t.b = function (e, t) {
                var n;
                return "click" === e.action ? n = t.native && t.native.clickTrackers : (n = t.native && t.native.impressionTrackers,
                    t.native && t.native.javascriptTrackers && Object(o.insertHtmlIntoIframe)(t.native.javascriptTrackers)),
                    (n || []).forEach(o.triggerPixel),
                    e.action
            }
            ,
            t.d = function (e, t) {
                var n = {};
                return Object.keys(e.native).forEach(function (r) {
                    var a = c.NATIVE_KEYS[r]
                        , s = i(e.native[r]);
                    Object(o.deepAccess)(t, "mediaTypes.native.".concat(r, ".sendId")) && (s = "".concat(a, ":").concat(e.adId)),
                        a && s && (n[a] = s)
                }),
                    n
            }
            ,
            t.c = function (e, t) {
                var n = {
                    message: "assetResponse",
                    adId: e.adId,
                    assets: []
                };
                return e.assets.forEach(function (e) {
                    var r = Object(o.getKeyByValue)(c.NATIVE_KEYS, e)
                        , a = i(t.native[r]);
                    n.assets.push({
                        key: r,
                        value: a
                    })
                }),
                    n
            }
            ;
        var o = n(0)
            , a = n(12)
            , s = n.n(a)
            , c = n(5)
            , u = []
            , d = Object.keys(c.NATIVE_KEYS).map(function (e) {
                return c.NATIVE_KEYS[e]
            })
            , l = {
                image: {
                    image: {
                        required: !0
                    },
                    title: {
                        required: !0
                    },
                    sponsoredBy: {
                        required: !0
                    },
                    clickUrl: {
                        required: !0
                    },
                    body: {
                        required: !1
                    },
                    icon: {
                        required: !1
                    }
                }
            }
    },
    38: function (e, t) {
        e.exports = {}
    },
    39: function (e, t, n) {
        var r = n(15)
            , i = n(18)
            , o = n(19)("species");
        e.exports = function (e, t) {
            var n, a = r(e).constructor;
            return void 0 === a || null == (n = r(a)[o]) ? t : i(n)
        }
    },
    4: function (e, t, n) {
        "use strict";
        function r() {
            return (r = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function o() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 3e3
                , t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
                , n = t.request
                , o = t.done;
            return function (t, u, d) {
                var l = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};
                try {
                    var f, p = l.method || (d ? "POST" : "GET"), h = document.createElement("a");
                    h.href = t;
                    var g = "object" === i(u) && null !== u ? u : {
                        success: function () {
                            s.logMessage("xhr success")
                        },
                        error: function (e) {
                            s.logError("xhr error", null, e)
                        }
                    };
                    if ("function" == typeof u && (g.success = u),
                        (f = new window.XMLHttpRequest).onreadystatechange = function () {
                            if (f.readyState === c) {
                                "function" == typeof o && o(h.origin);
                                var e = f.status;
                                200 <= e && e < 300 || 304 === e ? g.success(f.responseText, f) : g.error(f.statusText, f)
                            }
                        }
                        ,
                        a.b.getConfig("disableAjaxTimeout") || (f.ontimeout = function () {
                            s.logError("  xhr timeout after ", f.timeout, "ms")
                        }
                        ),
                        "GET" === p && d) {
                        var m = s.parseUrl(t, l);
                        r(m.search, d),
                            t = s.buildUrl(m)
                    }
                    f.open(p, t, !0),
                        a.b.getConfig("disableAjaxTimeout") || (f.timeout = e),
                        l.withCredentials && (f.withCredentials = !0),
                        s._each(l.customHeaders, function (e, t) {
                            f.setRequestHeader(t, e)
                        }),
                        l.preflight && f.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                        f.setRequestHeader("Content-Type", l.contentType || "text/plain"),
                        "function" == typeof n && n(h.origin),
                        "POST" === p && d ? f.send(d) : f.send()
                } catch (e) {
                    s.logError("xhr construction", e)
                }
            }
        }
        n.d(t, "a", function () {
            return u
        }),
            t.b = o;
        var a = n(3)
            , s = n(0)
            , c = 4
            , u = o()
    },
    40: function (e, t, n) {
        "use strict";
        t.a = function (e, t, n) {
            return t && e ? i()(s, t) ? a[e] ? (n && "function" == typeof n && (a[e].loaded ? n() : a[e].callbacks.push(n)),
                a[e].tag) : (a[e] = {
                    loaded: !1,
                    tag: null,
                    callbacks: []
                },
                    n && "function" == typeof n && a[e].callbacks.push(n),
                    o.logWarn("module ".concat(t, " is loading external JavaScript")),
                    function (t, n) {
                        var r = document.createElement("script");
                        return r.type = "text/javascript",
                            r.async = !0,
                            (a[e].tag = r).readyState ? r.onreadystatechange = function () {
                                "loaded" !== r.readyState && "complete" !== r.readyState || (r.onreadystatechange = null,
                                    n())
                            }
                                : r.onload = function () {
                                    n()
                                }
                            ,
                            r.src = t,
                            o.insertElement(r),
                            r
                    }(e, function () {
                        a[e].loaded = !0;
                        try {
                            for (var t = 0; t < a[e].callbacks.length; t++)
                                a[e].callbacks[t]()
                        } catch (e) {
                            o.logError("Error executing callback", "adloader.js:loadExternalScript", e)
                        }
                    })) : void o.logError("".concat(t, " not whitelisted for loading external JavaScript")) : void o.logError("cannot load external script without url and moduleCode")
        }
            ;
        var r = n(12)
            , i = n.n(r)
            , o = n(0)
            , a = {}
            , s = ["criteo", "outstream", "adagio", "browsi"]
    },
    41: function (e, t, n) {
        "use strict";
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function i() {
            return (i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function o(e, t) {
            t.timeToRespond > e.getTimeout() + m.b.getConfig("timeoutBuffer") && e.executeCallback(!0)
        }
        function a(e, t) {
            var n = e.getBidRequests()
                , r = S()(n, function (e) {
                    return e.bidderCode === t.bidderCode
                });
            !function (e, t) {
                var n;
                if (e.bidderCode && (0 < e.cpm || e.dealId)) {
                    var r = S()(t.bids, function (t) {
                        return t.adUnitCode === e.adUnitCode
                    });
                    n = function (e, t, n) {
                        if (!t)
                            return {};
                        var r = {}
                            , o = pbjs.bidderSettings;
                        if (o) {
                            var a = c(t.mediaType, e, n);
                            u(r, a, t),
                                e && o[e] && o[e][A.JSON_MAPPING.ADSERVER_TARGETING] && (u(r, o[e], t),
                                    t.sendStandardTargeting = o[e].sendStandardTargeting)
                        }
                        return t.native && (r = i({}, r, Object(p.d)(t, n))),
                            r
                    }(e.bidderCode, e, r)
                }
                e.adserverTargeting = i(e.adserverTargeting || {}, n)
            }(t, r),
                I.emit(A.EVENTS.BID_RESPONSE, t),
                e.addBidReceived(t),
                o(e, t)
        }
        function s(e, t, n) {
            if (e && n) {
                if (e === C.d) {
                    var r = Object(l.deepAccess)(t, "mediaTypes.".concat(C.d, ".context"), "instream");
                    if (n["".concat(C.d, "-").concat(r)])
                        return n["".concat(C.d, "-").concat(r)]
                }
                return n[e]
            }
        }
        function c(e, t, n) {
            function r(e, t) {
                return {
                    key: e,
                    val: "function" == typeof t ? function (e) {
                        return t(e)
                    }
                        : function (e) {
                            return Object(l.getValue)(e, t)
                        }
                }
            }
            var i = A.TARGETING_KEYS
                , o = q(e, n)
                , a = pbjs.bidderSettings;
            if (a[A.JSON_MAPPING.BD_SETTING_STANDARD] || (a[A.JSON_MAPPING.BD_SETTING_STANDARD] = {}),
                a[A.JSON_MAPPING.BD_SETTING_STANDARD][A.JSON_MAPPING.ADSERVER_TARGETING] || (a[A.JSON_MAPPING.BD_SETTING_STANDARD][A.JSON_MAPPING.ADSERVER_TARGETING] = [r(i.BIDDER, "bidderCode"), r(i.AD_ID, "adId"), r(i.PRICE_BUCKET, z(o)), r(i.SIZE, "size"), r(i.DEAL, "dealId"), r(i.SOURCE, "source"), r(i.FORMAT, "mediaType")]),
                "video" === e) {
                var s = a[A.JSON_MAPPING.BD_SETTING_STANDARD][A.JSON_MAPPING.ADSERVER_TARGETING];
                if ([i.UUID, i.CACHE_ID].forEach(function (e) {
                    void 0 === S()(s, function (t) {
                        return t.key === e
                    }) && s.push(r(e, "videoCacheKey"))
                }),
                    m.b.getConfig("cache.url") && (!t || !1 !== x.deepAccess(a, "".concat(t, ".sendStandardTargeting")))) {
                    var c = Object(l.parseUrl)(m.b.getConfig("cache.url"));
                    void 0 === S()(s, function (e) {
                        return e.key === i.CACHE_HOST
                    }) && s.push(r(i.CACHE_HOST, function (e) {
                        return x.deepAccess(e, "adserverTargeting.".concat(i.CACHE_HOST)) ? e.adserverTargeting[i.CACHE_HOST] : c.hostname
                    }))
                }
            }
            return a[A.JSON_MAPPING.BD_SETTING_STANDARD]
        }
        function u(e, t, n) {
            var r = t[A.JSON_MAPPING.ADSERVER_TARGETING];
            return n.size = n.getSize(),
                x._each(r, function (r) {
                    var i = r.key
                        , o = r.val;
                    if (e[i] && x.logWarn("The key: " + i + " is getting ovewritten"),
                        x.isFn(o))
                        try {
                            o = o(n)
                        } catch (e) {
                            x.logError("bidmanager", "ERROR", e)
                        }
                    (void 0 === t.suppressEmptyKeys || !0 !== t.suppressEmptyKeys) && i !== A.TARGETING_KEYS.DEAL || !x.isEmptyStr(o) && null != o ? e[i] = o : x.logInfo("suppressing empty key '" + i + "' from adserver targeting")
                }),
                e
        }
        function d(e, t) {
            return e[t.adUnitCode] || (e[t.adUnitCode] = {
                bids: []
            }),
                e[t.adUnitCode].bids.push(t),
                e
        }
        n.d(t, "b", function () {
            return j
        }),
            n.d(t, "a", function () {
                return k
            }),
            t.k = function (e) {
                function t() {
                    return {
                        auctionId: Y,
                        timestamp: p,
                        auctionEnd: h,
                        auctionStatus: v,
                        adUnits: F,
                        adUnitCodes: W,
                        labels: H,
                        bidderRequests: G,
                        noBids: J,
                        bidsReceived: V,
                        winningBids: Q,
                        timeout: X
                    }
                }
                function n(e, n) {
                    if (n && clearTimeout(b),
                        void 0 === h) {
                        var r = [];
                        e && (x.logMessage("Auction ".concat(Y, " timedOut")),
                            i = Z,
                            (r = G.map(function (e) {
                                return (e.bids || []).filter(function (e) {
                                    return !i.has(e.bidder)
                                })
                            }).reduce(l.flatten, []).map(function (e) {
                                return {
                                    bidId: e.bidId,
                                    bidder: e.bidder,
                                    adUnitCode: e.adUnitCode,
                                    auctionId: e.auctionId
                                }
                            })).length && I.emit(A.EVENTS.BID_TIMEOUT, r)),
                            v = k,
                            h = Date.now(),
                            I.emit(A.EVENTS.AUCTION_END, t()),
                            B(F, function () {
                                try {
                                    if (null != K) {
                                        var t = W
                                            , n = V.filter(x.bind.call(l.adUnitsFilter, this, t)).reduce(d, {});
                                        K.apply(pbjs, [n, e, Y]),
                                            K = null
                                    }
                                } catch (e) {
                                    x.logError("Error executing bidsBackHandler", null, e)
                                } finally {
                                    r.length && E.callTimedOutBidders(y, r, X);
                                    var i = m.b.getConfig("userSync") || {};
                                    i.enableOverride || T(i.syncDelay)
                                }
                            })
                    }
                    var i
                }
                function o() {
                    x.logInfo("Bids Received for Auction with id: ".concat(Y), V),
                        v = k,
                        n(!1, !0)
                }
                function c(e) {
                    Z.add(e)
                }
                function u(e) {
                    function u(e) {
                        var t = !0
                            , n = m.b.getConfig("maxRequestsPerOrigin") || _;
                        return e.bidRequests.some(function (e) {
                            var r = 1
                                , i = void 0 !== e.src && e.src === A.S2S.SRC ? "s2s" : e.bidderCode;
                            return N[i] && (!1 === N[i].SRA && (r = Math.min(e.bids.length, n)),
                                D[N[i].origin] + r > n && (t = !1)),
                                !t
                        }),
                            t && e.run(),
                            t
                    }
                    function d(e, t) {
                        void 0 === e[t] ? e[t] = 1 : e[t]++
                    }
                    var p = this;
                    e.forEach(function (e) {
                        var t;
                        t = e,
                            G = G.concat(t)
                    });
                    var h = {}
                        , y = {
                            bidRequests: e,
                            run: function () {
                                function y() {
                                    _--,
                                        P && 0 === _ && O()
                                }
                                var C, T;
                                C = n.bind(null, !0),
                                    T = setTimeout(C, X),
                                    b = T,
                                    v = j,
                                    I.emit(A.EVENTS.AUCTION_INIT, t());
                                var O, k, _, P, B, q, z = (O = o,
                                    k = p,
                                    _ = 0,
                                    P = !1,
                                    B = new Set,
                                    q = {},
                                {
                                    addBidResponse: function (e, t) {
                                        q[t.requestId] = !0,
                                            _++;
                                        var n = function (e) {
                                            var t = e.adUnitCode
                                                , n = e.bid
                                                , o = e.bidderRequest
                                                , a = e.auctionId
                                                , c = o.start
                                                , u = i({}, n, {
                                                    auctionId: a,
                                                    responseTimestamp: Object(l.timestamp)(),
                                                    requestTimestamp: c,
                                                    cpm: parseFloat(n.cpm) || 0,
                                                    bidder: n.bidderCode,
                                                    adUnitCode: t
                                                });
                                            u.timeToRespond = u.responseTimestamp - u.requestTimestamp,
                                                I.emit(A.EVENTS.BID_ADJUSTMENT, u);
                                            var d = o.bids && S()(o.bids, function (e) {
                                                return e.adUnitCode == t
                                            })
                                                , p = d && d.renderer;
                                            !p || !p.url || p.backupOnly && Object(l.isBoolean)(p.backupOnly) && n.renderer || (u.renderer = g.a.install({
                                                url: p.url
                                            }),
                                                u.renderer.setRender(p.render));
                                            var h = s(n.mediaType, d, m.b.getConfig("mediaTypePriceGranularity"))
                                                , v = Object(f.a)(u.cpm, "object" === r(h) ? h : m.b.getConfig("customPriceBucket"), m.b.getConfig("currency.granularityMultiplier"));
                                            return u.pbLg = v.low,
                                                u.pbMg = v.med,
                                                u.pbHg = v.high,
                                                u.pbAg = v.auto,
                                                u.pbDg = v.dense,
                                                u.pbCg = v.custom,
                                                u
                                        }({
                                            adUnitCode: e,
                                            bid: t,
                                            bidderRequest: this,
                                            auctionId: k.getAuctionId()
                                        });
                                        "video" === n.mediaType ? function (e, t, n, r) {
                                            var i = !0
                                                , o = Object(l.getBidRequest)(t.requestId, [n])
                                                , s = o && Object(l.deepAccess)(o, "mediaTypes.video")
                                                , c = s && Object(l.deepAccess)(s, "context");
                                            m.b.getConfig("cache.url") && c !== w.b && (t.videoCacheKey ? t.vastUrl || (x.logError("videoCacheKey specified but not required vastUrl for video bid"),
                                                i = !1) : (i = !1,
                                                    M(e, t, r, o))),
                                                i && (a(e, t),
                                                    r())
                                        }(k, n, this, y) : (a(k, n),
                                            y())
                                    },
                                    adapterDone: function () {
                                        B.add(this),
                                            P = k.getBidRequests().every(function (e) {
                                                return B.has(e)
                                            }),
                                            this.bids.forEach(function (e) {
                                                q[e.bidId] || (k.addNoBid(e),
                                                    I.emit(A.EVENTS.NO_BID, e))
                                            }),
                                            P && 0 === _ && O()
                                    }
                                });
                                E.callBids(F, e, function () {
                                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                        t[n] = arguments[n];
                                    R.apply({
                                        dispatch: z.addBidResponse,
                                        bidderRequest: this
                                    }, t)
                                }, z.adapterDone, {
                                    request: function (e, t) {
                                        d(D, t),
                                            d(h, e),
                                            N[e] || (N[e] = {
                                                SRA: !0,
                                                origin: t
                                            }),
                                            1 < h[e] && (N[e].SRA = !1)
                                    },
                                    done: function (e) {
                                        D[e]--,
                                            U[0] && u(U[0]) && U.shift()
                                    }
                                }, X, c)
                            }
                        };
                    u(y) || (x.logWarn("queueing auction due to limited endpoint capacity"),
                        U.push(y))
                }
                var p, h, v, b, y = e.adUnits, C = e.adUnitCodes, q = e.callback, z = e.cbTimeout, L = e.labels, $ = e.auctionId, F = y, H = L, W = C, G = [], V = [], J = [], Y = $ || x.generateUUID(), K = q, X = z, Q = [], Z = new Set;
                return {
                    addBidReceived: function (e) {
                        V = V.concat(e)
                    },
                    addNoBid: function (e) {
                        J = J.concat(e)
                    },
                    executeCallback: n,
                    callBids: function () {
                        v = O,
                            p = Date.now();
                        var e = E.makeBidRequests(F, p, Y, X, H);
                        x.logInfo("Bids Requested for Auction with id: ".concat(Y), e),
                            e.length < 1 ? (x.logWarn("No valid bid requests returned for auction"),
                                o()) : P.call({
                                    dispatch: u,
                                    context: this
                                }, e)
                    },
                    addWinningBid: function (e) {
                        Q = Q.concat(e),
                            E.callBidWonBidder(e.bidder, e, y)
                    },
                    setBidTargeting: function (e) {
                        E.callSetTargetingBidder(e.bidder, e)
                    },
                    getWinningBids: function () {
                        return Q
                    },
                    getTimeout: function () {
                        return X
                    },
                    getAuctionId: function () {
                        return Y
                    },
                    getAuctionStatus: function () {
                        return v
                    },
                    getAdUnits: function () {
                        return F
                    },
                    getAdUnitCodes: function () {
                        return W
                    },
                    getBidRequests: function () {
                        return G
                    },
                    getBidsReceived: function () {
                        return V
                    },
                    getNoBids: function () {
                        return J
                    }
                }
            }
            ,
            n.d(t, "c", function () {
                return R
            }),
            n.d(t, "e", function () {
                return P
            }),
            t.g = o,
            t.d = a,
            n.d(t, "f", function () {
                return M
            }),
            n.d(t, "i", function () {
                return q
            }),
            n.d(t, "h", function () {
                return z
            }),
            t.j = c;
        var l = n(0)
            , f = n(45)
            , p = n(37)
            , h = n(93)
            , g = n(11)
            , m = n(3)
            , v = n(43)
            , b = n(13)
            , y = n(10)
            , S = n.n(y)
            , w = n(28)
            , C = n(2)
            , T = v.a.syncUsers
            , x = n(0)
            , E = n(9).default
            , I = n(8)
            , A = n(5)
            , O = "started"
            , j = "inProgress"
            , k = "completed";
        I.on(A.EVENTS.BID_ADJUSTMENT, function (e) {
            !function (e) {
                var t, n = e.bidderCode, r = e.cpm;
                if (pbjs.bidderSettings && (n && pbjs.bidderSettings[n] && "function" == typeof pbjs.bidderSettings[n].bidCpmAdjustment ? t = pbjs.bidderSettings[n].bidCpmAdjustment : pbjs.bidderSettings[A.JSON_MAPPING.BD_SETTING_STANDARD] && "function" == typeof pbjs.bidderSettings[A.JSON_MAPPING.BD_SETTING_STANDARD].bidCpmAdjustment && (t = pbjs.bidderSettings[A.JSON_MAPPING.BD_SETTING_STANDARD].bidCpmAdjustment),
                    t))
                    try {
                        r = t(e.cpm, i({}, e))
                    } catch (e) {
                        x.logError("Error during bid adjustment", "bidmanager.js", e)
                    }
                0 <= r && (e.cpm = r)
            }(e)
        });
        var _ = 4
            , D = {}
            , N = {}
            , U = []
            , R = Object(b.b)("async", function (e, t) {
                this.dispatch.call(this.bidderRequest, e, t)
            }, "addBidResponse")
            , P = Object(b.b)("sync", function (e) {
                this.dispatch.call(this.context, e)
            }, "addBidderRequests")
            , B = Object(b.b)("async", function (e, t) {
                t && t()
            }, "bidsBackCallback")
            , M = Object(b.b)("async", function (e, t, n, r) {
                Object(h.b)([t], function (r, i) {
                    r ? (x.logWarn("Failed to save to the video cache: ".concat(r, ". Video bid must be discarded.")),
                        o(e, t)) : "" === i[0].uuid ? (x.logWarn("Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded."),
                            o(e, t)) : (t.videoCacheKey = i[0].uuid,
                                t.vastUrl || (t.vastUrl = Object(h.a)(t.videoCacheKey)),
                                a(e, t),
                                n())
                }, r)
            }, "callPrebidCache")
            , q = function (e, t) {
                var n = s(e, t, m.b.getConfig("mediaTypePriceGranularity"));
                return "string" == typeof e && n ? "string" == typeof n ? n : "custom" : m.b.getConfig("priceGranularity")
            }
            , z = function (e) {
                return function (t) {
                    return e === A.GRANULARITY_OPTIONS.AUTO ? t.pbAg : e === A.GRANULARITY_OPTIONS.DENSE ? t.pbDg : e === A.GRANULARITY_OPTIONS.LOW ? t.pbLg : e === A.GRANULARITY_OPTIONS.MEDIUM ? t.pbMg : e === A.GRANULARITY_OPTIONS.HIGH ? t.pbHg : e === A.GRANULARITY_OPTIONS.CUSTOM ? t.pbCg : void 0
                }
            }
    },
    42: function (e, t) {
        e.exports = {}
    },
    43: function (e, t, n) {
        "use strict";
        function r(e, t) {
            return function (e) {
                if (Array.isArray(e))
                    return e
            }(e) || function (e, t) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
                    var n = []
                        , r = !0
                        , i = !1
                        , o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
                            !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        i = !0,
                            o = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (i)
                                throw o
                        }
                    }
                    return n
                }
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        function i() {
            return (i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function o() {
            return {
                image: [],
                iframe: []
            }
        }
        function a() {
            if (S.syncEnabled && h.browserSupportsCookies) {
                try {
                    !function () {
                        y.image && s(m.image, function (e) {
                            var t = r(e, 2)
                                , n = t[0]
                                , i = t[1];
                            u.logMessage("Invoking image pixel user sync for bidder: ".concat(n)),
                                u.triggerPixel(i)
                        })
                    }(),
                        function () {
                            y.iframe && s(m.iframe, function (e) {
                                var t = r(e, 2)
                                    , n = t[0]
                                    , i = t[1];
                                u.logMessage("Invoking iframe user sync for bidder: ".concat(n)),
                                    u.insertUserSyncIframe(i)
                            })
                        }()
                } catch (e) {
                    return u.logError("Error firing user syncs", e)
                }
                m = o()
            }
        }
        function s(e, t) {
            u.shuffle(e).forEach(function (e) {
                t(e),
                    v.add(e[0])
            })
        }
        function c(e, t) {
            var n = S.filterSettings;
            if (function (e, t) {
                if (e.all && e[t])
                    return void u.logWarn('Detected presence of the "filterSettings.all" and "filterSettings.'.concat(t, '" in userSync config.  You cannot mix "all" with "iframe/image" configs; they are mutually exclusive.'));
                var n = e.all ? e.all : e[t]
                    , r = e.all ? "all" : t;
                if (n) {
                    var i = n.filter
                        , o = n.bidders;
                    return i && "include" !== i && "exclude" !== i ? void u.logWarn('UserSync "filterSettings.'.concat(r, ".filter\" setting '").concat(i, "' is not a valid option; use either 'include' or 'exclude'.")) : "*" === o || Array.isArray(o) && 0 < o.length && o.every(function (e) {
                        return u.isStr(e) && "*" !== e
                    }) || (u.logWarn('Detected an invalid setup in userSync "filterSettings.'.concat(r, ".bidders\"; use either '*' (to represent all bidders) or an array of bidders.")),
                        !1)
                }
            }(n, e)) {
                y[e] = !0;
                var r = n.all ? n.all : n[e]
                    , i = "*" === r.bidders ? [t] : r.bidders;
                return {
                    include: function (e, t) {
                        return !f()(e, t)
                    },
                    exclude: function (e, t) {
                        return f()(e, t)
                    }
                }[r.filter || "include"](i, t)
            }
        }
        n.d(t, "a", function () {
            return T
        });
        var u = n(0)
            , d = n(3)
            , l = n(12)
            , f = n.n(l)
            , p = n(7);
        d.b.setDefaults({
            userSync: u.deepClone({
                syncEnabled: !0,
                filterSettings: {
                    image: {
                        bidders: "*",
                        filter: "include"
                    }
                },
                syncsPerBidder: 5,
                syncDelay: 3e3,
                auctionDelay: 0
            })
        });
        var h, g, m, v, b, y, S, w = Object(p.a)("usersync"), C = !u.isSafariBrowser() && w.cookiesAreEnabled(), T = (h = {
            config: d.b.getConfig("userSync"),
            browserSupportsCookies: C
        },
            g = {},
            m = o(),
            v = new Set,
            y = {
                image: !0,
                iframe: !(b = {})
            },
            S = h.config,
            d.b.getConfig("userSync", function (e) {
                if (e.userSync) {
                    var t = e.userSync.filterSettings;
                    u.isPlainObject(t) && (t.image || t.all || (e.userSync.filterSettings.image = {
                        bidders: "*",
                        filter: "include"
                    }))
                }
                S = i(S, e.userSync)
            }),
            g.registerSync = function (e, t, n) {
                return v.has(t) ? u.logMessage('already fired syncs for "'.concat(t, '", ignoring registerSync call')) : S.syncEnabled && u.isArray(m[e]) ? t ? 0 !== S.syncsPerBidder && Number(b[t]) >= S.syncsPerBidder ? u.logWarn('Number of user syncs exceeded for "'.concat(t, '"')) : g.canBidderRegisterSync(e, t) ? (m[e].push([t, n]),
                    (r = b)[i = t] ? r[i] += 1 : r[i] = 1,
                    void (b = r)) : u.logWarn('Bidder "'.concat(t, '" not permitted to register their "').concat(e, '" userSync pixels.')) : u.logWarn("Bidder is required for registering sync") : u.logWarn('User sync type "'.concat(e, '" not supported'));
                var r, i
            }
            ,
            g.syncUsers = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
                return e ? setTimeout(a, Number(e)) : void a()
            }
            ,
            g.triggerUserSyncs = function () {
                S.enableOverride && g.syncUsers()
            }
            ,
            g.canBidderRegisterSync = function (e, t) {
                return !S.filterSettings || !c(e, t)
            }
            ,
            g)
    },
    44: function (e, t, n) {
        "use strict";
        function r() {
            return (r = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        function o(e) {
            return function (e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++)
                        n[t] = e[t];
                    return n
                }
            }(e) || function (e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
                    return Array.from(e)
            }(e) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        function a(e, t, n) {
            var r = 2 < arguments.length && void 0 !== n ? n : 0
                , i = []
                , a = S.b.getConfig("sendBidsControl.dealPrioritization")
                , c = Object(y.groupBy)(e, "adUnitCode");
            return Object.keys(c).forEach(function (e) {
                var n = []
                    , u = Object(y.groupBy)(c[e], "bidderCode");
                Object.keys(u).forEach(function (e) {
                    return n.push(u[e].reduce(t))
                }),
                    0 < r ? (n = a ? n.sort(s(!0)) : n.sort(function (e, t) {
                        return t.cpm - e.cpm
                    }),
                        i.push.apply(i, o(n.slice(0, r)))) : i.push.apply(i, o(n))
            }),
                i
        }
        function s(e) {
            var t = 0 < arguments.length && void 0 !== e && e;
            return function (e, n) {
                return void 0 !== e.adserverTargeting.hb_deal && void 0 === n.adserverTargeting.hb_deal ? -1 : void 0 === e.adserverTargeting.hb_deal && void 0 !== n.adserverTargeting.hb_deal ? 1 : t ? n.cpm - e.cpm : n.adserverTargeting.hb_pb - e.adserverTargeting.hb_pb
            }
        }
        function c(e, t) {
            return e.adserverTargeting && t && (A.isArray(t) && I()(t, e.adUnitCode) || "string" == typeof t && e.adUnitCode === t)
        }
        function u(e) {
            return "string" == typeof e ? [e] : A.isArray(e) ? e : m.getAdUnitCodes() || []
        }
        function d() {
            var e = m.getBidsReceived();
            return S.b.getConfig("useBidCache") || (e = e.filter(function (e) {
                return b[e.adUnitCode] === e.auctionId
            })),
                a(e = e.filter(function (e) {
                    return Object(y.deepAccess)(e, "video.context") !== x.a
                }).filter(function (e) {
                    return "banner" !== e.mediaType || Object(T.c)([e.width, e.height])
                }).filter(D).filter(_), y.getOldestHighestCpmBid)
        }
        function l() {
            return m.getStandardBidderAdServerTargeting().map(function (e) {
                return e.key
            }).concat(k).filter(y.uniques)
        }
        function f(e, t, n, r) {
            return Object.keys(t.adserverTargeting).filter(p()).forEach(function (n) {
                var r, i;
                e.length && e.filter((i = n,
                    function (e) {
                        return e.adUnitCode === t.adUnitCode && e.adserverTargeting[i]
                    }
                )).forEach((r = n,
                    function (e) {
                        A.isArray(e.adserverTargeting[r]) || (e.adserverTargeting[r] = [e.adserverTargeting[r]]),
                            e.adserverTargeting[r] = e.adserverTargeting[r].concat(t.adserverTargeting[r]).filter(y.uniques),
                            delete t.adserverTargeting[r]
                    }
                ))
            }),
                e.push(t),
                e
        }
        function p() {
            var e = l().concat(w.a);
            return function (t) {
                return -1 === e.indexOf(t)
            }
        }
        function h(e) {
            return i({}, e.adUnitCode, Object.keys(e.adserverTargeting).filter(p()).map(function (t) {
                return i({}, t.substring(0, 20), [e.adserverTargeting[t]])
            }))
        }
        function g(e, t) {
            return t.map(function (t) {
                return i({}, "".concat(t, "_").concat(e.bidderCode).substring(0, 20), [e.adserverTargeting[t]])
            })
        }
        n.d(t, "a", function () {
            return N
        });
        var m, v, b, y = n(0), S = n(3), w = n(37), C = n(23), T = n(91), x = n(2), E = n(12), I = n.n(E), A = n(0), O = n(5), j = [], k = Object.keys(O.TARGETING_KEYS).map(function (e) {
            return O.TARGETING_KEYS[e]
        }), _ = function (e) {
            return e.responseTimestamp + 1e3 * e.ttl + 1e3 > Object(y.timestamp)()
        }, D = function (e) {
            return e && (e.status && !I()([O.BID_STATUS.RENDERED], e.status) || !e.status)
        }, N = (m = C.a,
            b = {},
            (v = {}).setLatestAuctionForAdUnit = function (e, t) {
                b[e] = t
            }
            ,
            v.resetPresetTargeting = function (e, t) {
                if (Object(y.isGptPubadsDefined)()) {
                    var n = u(e)
                        , r = m.getAdUnits().filter(function (e) {
                            return I()(n, e.code)
                        });
                    window.googletag.pubads().getSlots().forEach(function (e) {
                        var n = A.isFn(t) && t(e);
                        j.forEach(function (t) {
                            r.forEach(function (r) {
                                (r.code === e.getAdUnitPath() || r.code === e.getSlotElementId() || A.isFn(n) && n(r.code)) && e.setTargeting(t, null)
                            })
                        })
                    })
                }
            }
            ,
            v.resetPresetTargetingAST = function (e) {
                u(e).forEach(function (e) {
                    var t = window.apntag.getTag(e);
                    if (t && t.keywords) {
                        var n = Object.keys(t.keywords)
                            , r = {};
                        n.forEach(function (e) {
                            I()(j, e.toLowerCase()) || (r[e] = t.keywords[e])
                        }),
                            window.apntag.modifyTag(e, {
                                keywords: r
                            })
                    }
                })
            }
            ,
            v.getAllTargeting = function (e) {
                function t(e) {
                    return Object(y.deepAccess)(e, O.JSON_MAPPING.ADSERVER_TARGETING)
                }
                var n, p, b, C, T, x, E, _, D, N, U = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : d(), R = u(e), P = (E = R,
                    _ = U,
                    D = v.getWinningBids(E, _),
                    N = l(),
                    (D = D.map(function (e) {
                        return i({}, e.adUnitCode, Object.keys(e.adserverTargeting).filter(function (t) {
                            return void 0 === e.sendStandardTargeting || e.sendStandardTargeting || -1 === N.indexOf(t)
                        }).reduce(function (t, n) {
                            var r = [e.adserverTargeting[n]]
                                , a = i({}, n.substring(0, 20), r);
                            if (n !== O.TARGETING_KEYS.DEAL)
                                return [].concat(o(t), [a]);
                            var s = i({}, "".concat(n, "_").concat(e.bidderCode).substring(0, 20), r);
                            return [].concat(o(t), [a, s])
                        }, []))
                    })).concat((x = R,
                        U.filter(function (e) {
                            return I()(x, e.adUnitCode)
                        }).map(function (e) {
                            return r({}, e)
                        }).reduce(f, []).map(h).filter(function (e) {
                            return e
                        }))).concat(S.b.getConfig("enableSendAllBids") ? (p = R,
                            b = U,
                            C = k.concat(w.a),
                            T = S.b.getConfig("sendBidsControl.bidLimit"),
                            a(b, y.getHighestCpm, T).map(function (e) {
                                if (c(e, p))
                                    return i({}, e.adUnitCode, g(e, C.filter(function (t) {
                                        return void 0 !== e.adserverTargeting[t]
                                    })))
                            }).filter(function (e) {
                                return e
                            })) : function (e, t) {
                                if (!0 !== S.b.getConfig("targetingControls.alwaysIncludeDeals"))
                                    return [];
                                var n = k.concat(w.a);
                                return a(t, y.getHighestCpm).map(function (t) {
                                    if (t.dealId && c(t, e))
                                        return i({}, t.adUnitCode, g(t, n.filter(function (e) {
                                            return void 0 !== t.adserverTargeting[e]
                                        })))
                                }).filter(function (e) {
                                    return e
                                })
                            }(R, U)).concat((n = R,
                                m.getAdUnits().filter(function (e) {
                                    return I()(n, e.code) && t(e)
                                }).map(function (e) {
                                    return i({}, e.code, (n = t(e),
                                        Object.keys(n).map(function (e) {
                                            return i({}, e, A.isArray(n[e]) ? n[e] : n[e].split(","))
                                        })));
                                    var n
                                }))));
                P.map(function (e) {
                    Object.keys(e).map(function (t) {
                        e[t].map(function (e) {
                            -1 === j.indexOf(Object.keys(e)[0]) && (j = Object.keys(e).concat(j))
                        })
                    })
                });
                var B = S.b.getConfig("targetingControls.allowTargetingKeys");
                Array.isArray(B) && 0 < B.length && (P = function (e, t) {
                    var n = r({}, O.TARGETING_KEYS, O.NATIVE_KEYS)
                        , i = Object.keys(n)
                        , o = {};
                    Object(y.logInfo)("allowTargetingKeys - allowed keys [ ".concat(t.map(function (e) {
                        return n[e]
                    }).join(", "), " ]")),
                        e.map(function (e) {
                            var r = Object.keys(e)[0]
                                , a = e[r].filter(function (e) {
                                    var r = Object.keys(e)[0]
                                        , a = 0 === i.filter(function (e) {
                                            return 0 === r.indexOf(n[e])
                                        }).length || t.find(function (e) {
                                            var t = n[e];
                                            return 0 === r.indexOf(t)
                                        });
                                    return o[r] = !a,
                                        a
                                });
                            e[r] = a
                        });
                    var a = Object.keys(o).filter(function (e) {
                        return o[e]
                    });
                    return Object(y.logInfo)("allowTargetingKeys - removed keys [ ".concat(a.join(", "), " ]")),
                        e.filter(function (e) {
                            return 0 < e[Object.keys(e)[0]].length
                        })
                }(P, B)),
                    P = P.map(function (e) {
                        return i({}, Object.keys(e)[0], e[Object.keys(e)[0]].map(function (e) {
                            return i({}, Object.keys(e)[0], e[Object.keys(e)[0]].join(", "))
                        }).reduce(function (e, t) {
                            return r(t, e)
                        }, {}))
                    }).reduce(function (e, t) {
                        var n = Object.keys(t)[0];
                        return e[n] = r({}, e[n], t[n]),
                            e
                    }, {});
                var M, q, z, L = S.b.getConfig("targetingControls.auctionKeyMaxChars");
                return L && (Object(y.logInfo)("Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ".concat(L, " characters.  Running checks on auction keys...")),
                    M = P,
                    q = L,
                    z = Object(y.deepClone)(M),
                    P = Object.keys(z).map(function (e) {
                        return {
                            adUnitCode: e,
                            adserverTargeting: z[e]
                        }
                    }).sort(s()).reduce(function (e, t, n, r) {
                        var i, o = (i = t.adserverTargeting,
                            Object.keys(i).reduce(function (e, t) {
                                return e + "".concat(t, "%3d").concat(encodeURIComponent(i[t]), "%26")
                            }, ""));
                        n + 1 === r.length && (o = o.slice(0, -3));
                        var a = t.adUnitCode
                            , s = o.length;
                        return s <= q ? (q -= s,
                            Object(y.logInfo)("AdUnit '".concat(a, "' auction keys comprised of ").concat(s, " characters.  Deducted from running threshold; new limit is ").concat(q), z[a]),
                            e[a] = z[a]) : Object(y.logWarn)("The following keys for adUnitCode '".concat(a, "' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ").concat(s, ", the current allotted amount was ").concat(q, ".\n"), z[a]),
                            n + 1 === r.length && 0 === Object.keys(e).length && Object(y.logError)("No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting."),
                            e
                    }, {})),
                    R.forEach(function (e) {
                        P[e] || (P[e] = {})
                    }),
                    P
            }
            ,
            v.setTargetingForGPT = function (e, t) {
                window.googletag.pubads().getSlots().forEach(function (n) {
                    Object.keys(e).filter((t || Object(y.isAdUnitCodeMatchingSlot))(n)).forEach(function (t) {
                        return Object.keys(e[t]).forEach(function (r) {
                            var i = e[t][r];
                            "string" == typeof i && (i = i.split(",")),
                                (i = 1 < i.length ? [i] : i).map(function (e) {
                                    return A.logMessage("Attempting to set key value for slot: ".concat(n.getSlotElementId(), " key: ").concat(r, " value: ").concat(e)),
                                        e
                                }).forEach(function (e) {
                                    n.setTargeting(r, e)
                                })
                        })
                    })
                })
            }
            ,
            v.getWinningBids = function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : d()
                    , n = u(e);
                return t.filter(function (e) {
                    return I()(n, e.adUnitCode)
                }).filter(function (e) {
                    return 0 < e.cpm
                }).map(function (e) {
                    return e.adUnitCode
                }).filter(y.uniques).map(function (e) {
                    return t.filter(function (t) {
                        return t.adUnitCode === e ? t : null
                    }).reduce(y.getHighestCpm)
                })
            }
            ,
            v.setTargetingForAst = function (e) {
                var t = v.getAllTargeting(e);
                try {
                    v.resetPresetTargetingAST(e)
                } catch (e) {
                    A.logError("unable to reset targeting for AST" + e)
                }
                Object.keys(t).forEach(function (e) {
                    return Object.keys(t[e]).forEach(function (n) {
                        if (A.logMessage("Attempting to set targeting for targetId: ".concat(e, " key: ").concat(n, " value: ").concat(t[e][n])),
                            A.isStr(t[e][n]) || A.isArray(t[e][n])) {
                            var r = {};
                            n.search(/pt[0-9]/) < 0 ? r[n.toUpperCase()] = t[e][n] : r[n] = t[e][n],
                                window.apntag.setKeywords(e, r, {
                                    overrideKeyValue: !0
                                })
                        }
                    })
                })
            }
            ,
            v.isApntagDefined = function () {
                if (window.apntag && A.isFn(window.apntag.setKeywords))
                    return !0
            }
            ,
            v)
    },
    45: function (e, t, n) {
        "use strict";
        function r(e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1
                , r = parseFloat(e);
            return isNaN(r) && (r = ""),
            {
                low: "" === r ? "" : i(e, d, n),
                med: "" === r ? "" : i(e, l, n),
                high: "" === r ? "" : i(e, f, n),
                auto: "" === r ? "" : i(e, h, n),
                dense: "" === r ? "" : i(e, p, n),
                custom: "" === r ? "" : i(e, t, n)
            }
        }
        function i(e, t, n) {
            var r = "";
            if (!o(t))
                return r;
            var i, a, c, d, l, f, p, h, g, m = t.buckets.reduce(function (e, t) {
                return e.max > t.max ? e : t
            }, {
                max: 0
            }), v = 0, b = s()(t.buckets, function (t) {
                if (e > m.max * n) {
                    var i = t.precision;
                    void 0 === i && (i = u),
                        r = (t.max * n).toFixed(i)
                } else {
                    if (e <= t.max * n && v * n <= e)
                        return t.min = v,
                            t;
                    v = t.max
                }
            });
            return b && (i = e,
                c = n,
                d = void 0 !== (a = b).precision ? a.precision : u,
                l = a.increment * c,
                f = a.min * c,
                p = Math.pow(10, d + 2),
                h = (i * p - f * p) / (l * p),
                g = Math.floor(h) * l + f,
                r = (g = Number(g.toFixed(10))).toFixed(d)),
                r
        }
        function o(e) {
            if (c.isEmpty(e) || !e.buckets || !Array.isArray(e.buckets))
                return !1;
            var t = !0;
            return e.buckets.forEach(function (e) {
                e.max && e.increment || (t = !1)
            }),
                t
        }
        n.d(t, "a", function () {
            return r
        }),
            n.d(t, "b", function () {
                return o
            });
        var a = n(10)
            , s = n.n(a)
            , c = n(0)
            , u = 2
            , d = {
                buckets: [{
                    max: 5,
                    increment: .5
                }]
            }
            , l = {
                buckets: [{
                    max: 20,
                    increment: .1
                }]
            }
            , f = {
                buckets: [{
                    max: 20,
                    increment: .01
                }]
            }
            , p = {
                buckets: [{
                    max: 3,
                    increment: .01
                }, {
                    max: 8,
                    increment: .05
                }, {
                    max: 20,
                    increment: .5
                }]
            }
            , h = {
                buckets: [{
                    max: 5,
                    increment: .05
                }, {
                    max: 10,
                    increment: .1
                }, {
                    max: 20,
                    increment: .5
                }]
            }
    },
    46: function (e, t) {
        e.exports = function (e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
    },
    47: function (e, t, n) {
        var r = n(70)
            , i = n(49);
        e.exports = function (e) {
            return r(i(e))
        }
    },
    48: function (e, t) {
        var n = {}.toString;
        e.exports = function (e) {
            return n.call(e).slice(8, -1)
        }
    },
    49: function (e, t) {
        e.exports = function (e) {
            if (null == e)
                throw TypeError("Can't call method on " + e);
            return e
        }
    },
    496: function (e, t, n) {
        var r = n(497);
        e.exports = r
    },
    497: function (e, t, n) {
        n(498);
        var r = n(42);
        e.exports = r.Number.isInteger
    },
    498: function (e, t, n) {
        n(14)({
            target: "Number",
            stat: !0
        }, {
            isInteger: n(499)
        })
    },
    499: function (e, t, n) {
        var r = n(25)
            , i = Math.floor;
        e.exports = function (e) {
            return !r(e) && isFinite(e) && i(e) === e
        }
    },
    5: function (e, t) {
        e.exports = {
            JSON_MAPPING: {
                PL_CODE: "code",
                PL_SIZE: "sizes",
                PL_BIDS: "bids",
                BD_BIDDER: "bidder",
                BD_ID: "paramsd",
                BD_PL_ID: "placementId",
                ADSERVER_TARGETING: "adserverTargeting",
                BD_SETTING_STANDARD: "standard"
            },
            DEBUG_MODE: "pbjs_debug",
            STATUS: {
                GOOD: 1,
                NO_BID: 2
            },
            CB: {
                TYPE: {
                    ALL_BIDS_BACK: "allRequestedBidsBack",
                    AD_UNIT_BIDS_BACK: "adUnitBidsBack",
                    BID_WON: "bidWon",
                    REQUEST_BIDS: "requestBids"
                }
            },
            EVENTS: {
                AUCTION_INIT: "auctionInit",
                AUCTION_END: "auctionEnd",
                BID_ADJUSTMENT: "bidAdjustment",
                BID_TIMEOUT: "bidTimeout",
                BID_REQUESTED: "bidRequested",
                BID_RESPONSE: "bidResponse",
                NO_BID: "noBid",
                BID_WON: "bidWon",
                BIDDER_DONE: "bidderDone",
                SET_TARGETING: "setTargeting",
                BEFORE_REQUEST_BIDS: "beforeRequestBids",
                REQUEST_BIDS: "requestBids",
                ADD_AD_UNITS: "addAdUnits",
                AD_RENDER_FAILED: "adRenderFailed",
                TCF2_ENFORCEMENT: "tcf2Enforcement",
                AUCTION_DEBUG: "auctionDebug"
            },
            AD_RENDER_FAILED_REASON: {
                PREVENT_WRITING_ON_MAIN_DOCUMENT: "preventWritingOnMainDocuemnt",
                NO_AD: "noAd",
                EXCEPTION: "exception",
                CANNOT_FIND_AD: "cannotFindAd",
                MISSING_DOC_OR_ADID: "missingDocOrAdid"
            },
            EVENT_ID_PATHS: {
                bidWon: "adUnitCode"
            },
            GRANULARITY_OPTIONS: {
                LOW: "low",
                MEDIUM: "medium",
                HIGH: "high",
                AUTO: "auto",
                DENSE: "dense",
                CUSTOM: "custom"
            },
            TARGETING_KEYS: {
                BIDDER: "hb_bidder",
                AD_ID: "hb_adid",
                PRICE_BUCKET: "hb_pb",
                SIZE: "hb_size",
                DEAL: "hb_deal",
                SOURCE: "hb_source",
                FORMAT: "hb_format",
                UUID: "hb_uuid",
                CACHE_ID: "hb_cache_id",
                CACHE_HOST: "hb_cache_host"
            },
            NATIVE_KEYS: {
                title: "hb_native_title",
                body: "hb_native_body",
                body2: "hb_native_body2",
                privacyLink: "hb_native_privacy",
                privacyIcon: "hb_native_privicon",
                sponsoredBy: "hb_native_brand",
                image: "hb_native_image",
                icon: "hb_native_icon",
                clickUrl: "hb_native_linkurl",
                displayUrl: "hb_native_displayurl",
                cta: "hb_native_cta",
                rating: "hb_native_rating",
                address: "hb_native_address",
                downloads: "hb_native_downloads",
                likes: "hb_native_likes",
                phone: "hb_native_phone",
                price: "hb_native_price",
                salePrice: "hb_native_saleprice"
            },
            S2S: {
                SRC: "s2s",
                DEFAULT_ENDPOINT: "https://prebid.adnxs.com/pbs/v1/openrtb2/auction",
                SYNCED_BIDDERS_KEY: "pbjsSyncs"
            },
            BID_STATUS: {
                BID_TARGETING_SET: "targetingSet",
                RENDERED: "rendered",
                BID_REJECTED: "bidRejected"
            }
        }
    },
    50: function (e, t, n) {
        var r = n(58)
            , i = Math.min;
        e.exports = function (e) {
            return 0 < e ? i(r(e), 9007199254740991) : 0
        }
    },
    51: function (e, t) {
        e.exports = function () { }
    },
    52: function (e, t, n) {
        var r = n(27);
        e.exports = r
    },
    53: function (e, t) {
        e.exports = {}
    },
    54: function (e, t, n) {
        var r, i, o, a = n(113), s = n(24), c = n(25), u = n(31), d = n(26), l = n(65), f = n(53), p = s.WeakMap;
        if (a) {
            var h = new p
                , g = h.get
                , m = h.has
                , v = h.set;
            r = function (e, t) {
                return v.call(h, e, t),
                    t
            }
                ,
                i = function (e) {
                    return g.call(h, e) || {}
                }
                ,
                o = function (e) {
                    return m.call(h, e)
                }
        } else {
            var b = l("state");
            f[b] = !0,
                r = function (e, t) {
                    return u(e, b, t),
                        t
                }
                ,
                i = function (e) {
                    return d(e, b) ? e[b] : {}
                }
                ,
                o = function (e) {
                    return d(e, b)
                }
        }
        e.exports = {
            set: r,
            get: i,
            has: o,
            enforce: function (e) {
                return o(e) ? i(e) : r(e, {})
            },
            getterFor: function (e) {
                return function (t) {
                    var n;
                    if (!c(t) || (n = i(t)).type !== e)
                        throw TypeError("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        }
    },
    55: function (e, t, n) {
        var r = n(25);
        e.exports = function (e, t) {
            if (!r(e))
                return e;
            var n, i;
            if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e)))
                return i;
            if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e)))
                return i;
            if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e)))
                return i;
            throw TypeError("Can't convert object to primitive value")
        }
    },
    56: function (e, t, n) {
        function r(e) {
            var t = 1 == e
                , n = 2 == e
                , r = 3 == e
                , d = 4 == e
                , l = 6 == e
                , f = 5 == e || l;
            return function (p, h, g, m) {
                for (var v, b, y = a(p), S = o(y), w = i(h, g, 3), C = s(S.length), T = 0, x = m || c, E = t ? x(p, C) : n ? x(p, 0) : void 0; T < C; T++)
                    if ((f || T in S) && (b = w(v = S[T], T, y),
                        e))
                        if (t)
                            E[T] = b;
                        else if (b)
                            switch (e) {
                                case 3:
                                    return !0;
                                case 5:
                                    return v;
                                case 6:
                                    return T;
                                case 2:
                                    u.call(E, v)
                            }
                        else if (d)
                            return !1;
                return l ? -1 : r || d ? d : E
            }
        }
        var i = n(22)
            , o = n(70)
            , a = n(57)
            , s = n(50)
            , c = n(101)
            , u = [].push;
        e.exports = {
            forEach: r(0),
            map: r(1),
            filter: r(2),
            some: r(3),
            every: r(4),
            find: r(5),
            findIndex: r(6)
        }
    },
    57: function (e, t, n) {
        var r = n(49);
        e.exports = function (e) {
            return Object(r(e))
        }
    },
    58: function (e, t) {
        var n = Math.ceil
            , r = Math.floor;
        e.exports = function (e) {
            return isNaN(e = +e) ? 0 : (0 < e ? r : n)(e)
        }
    },
    59: function (e, t) {
        var n = 0
            , r = Math.random();
        e.exports = function (e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++n + r).toString(36)
        }
    },
    60: function (e, t, n) {
        function r(e) {
            throw e
        }
        var i = n(29)
            , o = n(30)
            , a = n(26)
            , s = Object.defineProperty
            , c = {};
        e.exports = function (e, t) {
            if (a(c, e))
                return c[e];
            var n = [][e]
                , u = !!a(t = t || {}, "ACCESSORS") && t.ACCESSORS
                , d = a(t, 0) ? t[0] : r
                , l = a(t, 1) ? t[1] : void 0;
            return c[e] = !!n && !o(function () {
                if (u && !i)
                    return !0;
                var e = {
                    length: -1
                };
                u ? s(e, 1, {
                    enumerable: !0,
                    get: r
                }) : e[1] = 1,
                    n.call(e, d, l)
            })
        }
    },
    61: function (e, t, n) {
        var r = n(62)
            , i = n(38)
            , o = n(19)("iterator");
        e.exports = function (e) {
            if (null != e)
                return e[o] || e["@@iterator"] || i[r(e)]
        }
    },
    62: function (e, t, n) {
        var r = n(63)
            , i = n(48)
            , o = n(19)("toStringTag")
            , a = "Arguments" == i(function () {
                return arguments
            }());
        e.exports = r ? i : function (e) {
            var t, n, r;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
                try {
                    return e[t]
                } catch (e) { }
            }(t = Object(e), o)) ? n : a ? i(t) : "Object" == (r = i(t)) && "function" == typeof t.callee ? "Arguments" : r
        }
    },
    63: function (e, t, n) {
        var r = {};
        r[n(19)("toStringTag")] = "z",
            e.exports = "[object z]" === String(r)
    },
    64: function (e, t, n) {
        var r = n(63)
            , i = n(33).f
            , o = n(31)
            , a = n(26)
            , s = n(112)
            , c = n(19)("toStringTag");
        e.exports = function (e, t, n, u) {
            if (e) {
                var d = n ? e : e.prototype;
                a(d, c) || i(d, c, {
                    configurable: !0,
                    value: t
                }),
                    u && !r && o(d, "toString", s)
            }
        }
    },
    65: function (e, t, n) {
        var r = n(73)
            , i = n(59)
            , o = r("keys");
        e.exports = function (e) {
            return o[e] || (o[e] = i(e))
        }
    },
    66: function (e, t, n) {
        "use strict";
        function r() {
            return this
        }
        var i = n(14)
            , o = n(121)
            , a = n(86)
            , s = n(123)
            , c = n(64)
            , u = n(31)
            , d = n(84)
            , l = n(19)
            , f = n(16)
            , p = n(38)
            , h = n(85)
            , g = h.IteratorPrototype
            , m = h.BUGGY_SAFARI_ITERATORS
            , v = l("iterator")
            , b = "values"
            , y = "entries";
        e.exports = function (e, t, n, l, h, S, w) {
            function C(e) {
                if (e === h && k)
                    return k;
                if (!m && e in O)
                    return O[e];
                switch (e) {
                    case "keys":
                    case b:
                    case y:
                        return function () {
                            return new n(this, e)
                        }
                }
                return function () {
                    return new n(this)
                }
            }
            o(n, t, l);
            var T, x, E, I = t + " Iterator", A = !1, O = e.prototype, j = O[v] || O["@@iterator"] || h && O[h], k = !m && j || C(h), _ = "Array" == t && O.entries || j;
            if (_ && (T = a(_.call(new e)),
                g !== Object.prototype && T.next && (f || a(T) === g || (s ? s(T, g) : "function" != typeof T[v] && u(T, v, r)),
                    c(T, I, !0, !0),
                    f && (p[I] = r))),
                h == b && j && j.name !== b && (A = !0,
                    k = function () {
                        return j.call(this)
                    }
                ),
                f && !w || O[v] === k || u(O, v, k),
                p[t] = k,
                h)
                if (x = {
                    values: C(b),
                    keys: S ? k : C("keys"),
                    entries: C(y)
                },
                    w)
                    for (E in x)
                        !m && !A && E in O || d(O, E, x[E]);
                else
                    i({
                        target: t,
                        proto: !0,
                        forced: m || A
                    }, x);
            return x
        }
    },
    67: function (e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r, i, a, s = (i = n,
                a = o[r = e] = o[r] || {
                    bidders: {}
                },
                i ? a.bidders[i] = a.bidders[i] || {} : a);
            return s[t] = (s[t] || 0) + 1,
                s[t]
        }
        n.d(t, "a", function () {
            return a
        });
        var i = n(0)
            , o = {}
            , a = {
                incrementRequestsCounter: function (e) {
                    return r(e, "requestsCounter")
                },
                incrementBidderRequestsCounter: function (e, t) {
                    return r(e, "requestsCounter", t)
                },
                incrementBidderWinsCounter: function (e, t) {
                    return r(e, "winsCounter", t)
                },
                getRequestsCounter: function (e) {
                    return Object(i.deepAccess)(o, "".concat(e, ".requestsCounter")) || 0
                },
                getBidderRequestsCounter: function (e, t) {
                    return Object(i.deepAccess)(o, "".concat(e, ".bidders.").concat(t, ".requestsCounter")) || 0
                },
                getBidderWinsCounter: function (e, t) {
                    return Object(i.deepAccess)(o, "".concat(e, ".bidders.").concat(t, ".winsCounter")) || 0
                }
            }
    },
    68: function (e, t, n) {
        "use strict";
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function i() {
            return (i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function o(e, t, n) {
            e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = t,
                e.defaultView.frameElement.height = n)
        }
        function a(e, t) {
            var n = [];
            return _.isArray(e) && (t ? e.length === t : 0 < e.length) && (e.every(function (e) {
                return Object(g.isArrayOfNums)(e, 2)
            }) ? n = e : Object(g.isArrayOfNums)(e, 2) && n.push(e)),
                n
        }
        function s(e) {
            var t = _.deepClone(e)
                , n = t.mediaTypes.banner
                , r = a(n.sizes);
            return 0 < r.length ? (n.sizes = r,
                t.sizes = r) : (_.logError("Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request."),
                    delete t.mediaTypes.banner),
                t
        }
        function c(e) {
            var t = _.deepClone(e)
                , n = t.mediaTypes.video;
            if (n.playerSize) {
                var r = "number" == typeof n.playerSize[0] ? 2 : 1
                    , i = a(n.playerSize, r);
                0 < i.length ? (2 == r && _.logInfo("Transforming video.playerSize from [640,480] to [[640,480]] so it's in the proper format."),
                    n.playerSize = i,
                    t.sizes = i) : (_.logError("Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request."),
                        delete t.mediaTypes.video.playerSize)
            }
            return t
        }
        function u(e) {
            var t = _.deepClone(e)
                , n = t.mediaTypes.native;
            return n.image && n.image.sizes && !Array.isArray(n.image.sizes) && (_.logError("Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request."),
                delete t.mediaTypes.native.image.sizes),
                n.image && n.image.aspect_ratios && !Array.isArray(n.image.aspect_ratios) && (_.logError("Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request."),
                    delete t.mediaTypes.native.image.aspect_ratios),
                n.icon && n.icon.sizes && !Array.isArray(n.icon.sizes) && (_.logError("Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request."),
                    delete t.mediaTypes.native.icon.sizes),
                t
        }
        function d(e) {
            var t = y.a[e]().filter(_.bind.call(g.adUnitsFilter, this, y.a.getAdUnitCodes()))
                , n = y.a.getLastAuctionId();
            return t.map(function (e) {
                return e.adUnitCode
            }).filter(g.uniques).map(function (e) {
                return t.filter(function (t) {
                    return t.auctionId === n && t.adUnitCode === e
                })
            }).filter(function (e) {
                return e && e[0] && e[0].adUnitCode
            }).map(function (e) {
                return t = {},
                    n = e[0].adUnitCode,
                    r = {
                        bids: e
                    },
                    n in t ? Object.defineProperty(t, n, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[n] = r,
                    t;
                var t, n, r
            }).reduce(function (e, t) {
                return i(e, t)
            }, {})
        }
        function l(e) {
            var t = e.reason
                , n = e.message
                , r = e.bid
                , i = e.id
                , o = {
                    reason: t,
                    message: n
                };
            r && (o.bid = r),
                i && (o.adId = i),
                _.logError(n),
                N.emit(z, o)
        }
        function f(e, t) {
            function n(e) {
                for (var t; t = e.shift();)
                    t()
            }
            n(O.c),
                n(K),
                e.call(this, t)
        }
        function p(e) {
            e.forEach(function (e) {
                if (void 0 === e.called)
                    try {
                        e.call(),
                            e.called = !0
                    } catch (e) {
                        _.logError("Error processing command :", "prebid.js", e)
                    }
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            n.d(t, "adUnitSetupChecks", function () {
                return J
            }),
            n.d(t, "checkAdUnitSetup", function () {
                return Y
            }),
            t.executeCallbacks = f;
        var h = n(21)
            , g = n(0)
            , m = n(227)
            , v = n(43)
            , b = n(3)
            , y = n(23)
            , S = n(44)
            , w = n(13)
            , C = n(228)
            , T = n(12)
            , x = n.n(T)
            , E = n(67)
            , I = n(11)
            , A = n(34)
            , O = n(7)
            , j = Object(h.a)()
            , k = n(5)
            , _ = n(0)
            , D = n(9).default
            , N = n(8)
            , U = v.a.triggerUserSyncs
            , R = k.EVENTS
            , P = R.ADD_AD_UNITS
            , B = R.BID_WON
            , M = R.REQUEST_BIDS
            , q = R.SET_TARGETING
            , z = R.AD_RENDER_FAILED
            , L = k.AD_RENDER_FAILED_REASON
            , $ = L.PREVENT_WRITING_ON_MAIN_DOCUMENT
            , F = L.NO_AD
            , H = L.EXCEPTION
            , W = L.CANNOT_FIND_AD
            , G = L.MISSING_DOC_OR_ADID
            , V = {
                bidWon: function (e) {
                    var t = y.a.getBidsRequested().map(function (e) {
                        return e.bids.map(function (e) {
                            return e.adUnitCode
                        })
                    }).reduce(g.flatten).filter(g.uniques);
                    return !!_.contains(t, e) || void _.logError('The "' + e + '" placement is not defined.')
                }
            };
        Object(C.a)(),
            j.bidderSettings = j.bidderSettings || {},
            j.libLoaded = !0,
            j.version = "v4.14.0",
            _.logInfo("Prebid.js v4.14.0 loaded"),
            j.adUnits = j.adUnits || [],
            j.triggerUserSyncs = U;
        var J = {
            validateBannerMediaType: s,
            validateVideoMediaType: c,
            validateNativeMediaType: u,
            validateSizes: a
        }
            , Y = Object(w.b)("sync", function (e) {
                var t = [];
                return e.forEach(function (e) {
                    var n, r, o, a = e.mediaTypes, d = e.bids;
                    if (d && _.isArray(d))
                        if (a && 0 !== Object.keys(a).length) {
                            a.banner && (n = s(e)),
                                a.video && (r = c(n || e)),
                                a.native && (o = u(r || n || e));
                            var l = i({}, n, r, o);
                            t.push(l)
                        } else
                            _.logError("Detected adUnit.code '".concat(e.code, "' did not have a 'mediaTypes' object defined.  This is a required field for the auction, so this adUnit has been removed."));
                    else
                        _.logError("Detected adUnit.code '".concat(e.code, "' did not have 'adUnit.bids' defined or 'adUnit.bids' is not an array. Removing adUnit from auction."))
                }),
                    t
            }, "checkAdUnitSetup");
        j.getAdserverTargetingForAdUnitCodeStr = function (e) {
            if (_.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments),
                e) {
                var t = j.getAdserverTargetingForAdUnitCode(e);
                return _.transformAdServerTargetingObj(t)
            }
            _.logMessage("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode")
        }
            ,
            j.getAdserverTargetingForAdUnitCode = function (e) {
                return j.getAdserverTargeting(e)[e]
            }
            ,
            j.getAdserverTargeting = function (e) {
                return _.logInfo("Invoking pbjs.getAdserverTargeting", arguments),
                    S.a.getAllTargeting(e)
            }
            ,
            j.getNoBids = function () {
                return _.logInfo("Invoking pbjs.getNoBids", arguments),
                    d("getNoBids")
            }
            ,
            j.getBidResponses = function () {
                return _.logInfo("Invoking pbjs.getBidResponses", arguments),
                    d("getBidsReceived")
            }
            ,
            j.getBidResponsesForAdUnitCode = function (e) {
                return {
                    bids: y.a.getBidsReceived().filter(function (t) {
                        return t.adUnitCode === e
                    })
                }
            }
            ,
            j.setTargetingForGPTAsync = function (e, t) {
                if (_.logInfo("Invoking pbjs.setTargetingForGPTAsync", arguments),
                    Object(g.isGptPubadsDefined)()) {
                    var n = S.a.getAllTargeting(e);
                    S.a.resetPresetTargeting(e, t),
                        S.a.setTargetingForGPT(n, t),
                        Object.keys(n).forEach(function (e) {
                            Object.keys(n[e]).forEach(function (t) {
                                "hb_adid" === t && y.a.setStatusForBids(n[e][t], k.BID_STATUS.BID_TARGETING_SET)
                            })
                        }),
                        N.emit(q, n)
                } else
                    _.logError("window.googletag is not defined on the page")
            }
            ,
            j.setTargetingForAst = function (e) {
                _.logInfo("Invoking pbjs.setTargetingForAn", arguments),
                    S.a.isApntagDefined() ? (S.a.setTargetingForAst(e),
                        N.emit(q, S.a.getAllTargeting())) : _.logError("window.apntag is not defined on the page")
            }
            ,
            j.renderAd = function (e, t, n) {
                if (_.logInfo("Invoking pbjs.renderAd", arguments),
                    _.logMessage("Calling renderAd with adId :" + t),
                    e && t)
                    try {
                        var r = y.a.findBidByAdId(t);
                        if (r) {
                            if (r.ad = _.replaceAuctionPrice(r.ad, r.cpm),
                                r.adUrl = _.replaceAuctionPrice(r.adUrl, r.cpm),
                                n && n.clickThrough) {
                                var i = n.clickThrough;
                                r.ad = _.replaceClickThrough(r.ad, i),
                                    r.adUrl = _.replaceClickThrough(r.adUrl, i)
                            }
                            y.a.addWinningBid(r),
                                N.emit(B, r);
                            var a = r.height
                                , s = r.width
                                , c = r.ad
                                , u = r.mediaType
                                , d = r.adUrl
                                , f = r.renderer
                                , p = document.createComment("Creative ".concat(r.creativeId, " served by ").concat(r.bidder, " Prebid.js Header Bidding"));
                            if (_.insertElement(p, e, "body"),
                                Object(I.c)(f))
                                Object(I.b)(f, r);
                            else if (e === document && !_.inIframe() || "video" === u) {
                                var h = "Error trying to write ad. Ad render call ad id ".concat(t, " was prevented from writing to the main document.");
                                l({
                                    reason: $,
                                    message: h,
                                    bid: r,
                                    id: t
                                })
                            } else if (c) {
                                if (navigator.userAgent && -1 < navigator.userAgent.toLowerCase().indexOf("firefox/")) {
                                    var g = navigator.userAgent.toLowerCase().match(/firefox\/([\d\.]+)/)[1];
                                    g && parseInt(g, 10) < 67 && e.open("text/html", "replace")
                                }
                                e.write(c),
                                    e.close(),
                                    o(e, s, a),
                                    _.callBurl(r)
                            } else if (d) {
                                var m = _.createInvisibleIframe();
                                m.height = a,
                                    m.width = s,
                                    m.style.display = "inline",
                                    m.style.overflow = "hidden",
                                    m.src = d,
                                    _.insertElement(m, e, "body"),
                                    o(e, s, a),
                                    _.callBurl(r)
                            } else {
                                var v = "Error trying to write ad. No ad for bid response id: ".concat(t);
                                l({
                                    reason: F,
                                    message: v,
                                    bid: r,
                                    id: t
                                })
                            }
                        } else {
                            var b = "Error trying to write ad. Cannot find ad by given id : ".concat(t);
                            l({
                                reason: W,
                                message: b,
                                id: t
                            })
                        }
                    } catch (e) {
                        var S = "Error trying to write ad Id :".concat(t, " to the page:").concat(e.message);
                        l({
                            reason: H,
                            message: S,
                            id: t
                        })
                    }
                else {
                    var w = "Error trying to write ad Id :".concat(t, " to the page. Missing document or adId");
                    l({
                        reason: G,
                        message: w,
                        id: t
                    })
                }
            }
            ,
            j.removeAdUnit = function (e) {
                _.logInfo("Invoking pbjs.removeAdUnit", arguments),
                    e ? (_.isArray(e) ? e : [e]).forEach(function (e) {
                        for (var t = j.adUnits.length - 1; 0 <= t; t--)
                            j.adUnits[t].code === e && j.adUnits.splice(t, 1)
                    }) : j.adUnits = []
            }
            ,
            j.requestBids = Object(w.b)("async", function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = e.bidsBackHandler
                    , n = e.timeout
                    , r = e.adUnits
                    , i = e.adUnitCodes
                    , o = e.labels
                    , a = e.auctionId;
                N.emit(M);
                var s = n || b.b.getConfig("bidderTimeout");
                if (r = r || j.adUnits,
                    _.logInfo("Invoking pbjs.requestBids", arguments),
                    r = Y(r),
                    i && i.length ? r = r.filter(function (e) {
                        return x()(i, e.code)
                    }) : i = r && r.map(function (e) {
                        return e.code
                    }),
                    r.forEach(function (e) {
                        var t = Object.keys(e.mediaTypes || {
                            banner: "banner"
                        })
                            , n = e.bids.map(function (e) {
                                return e.bidder
                            })
                            , r = D.bidderRegistry
                            , i = b.b.getConfig("s2sConfig")
                            , o = i && i.bidders
                            , a = o ? n.filter(function (e) {
                                return !x()(o, e)
                            }) : n;
                        e.transactionId = _.generateUUID(),
                            a.forEach(function (n) {
                                var i = r[n]
                                    , o = i && i.getSpec && i.getSpec()
                                    , a = o && o.supportedMediaTypes || ["banner"];
                                t.some(function (e) {
                                    return x()(a, e)
                                }) ? E.a.incrementBidderRequestsCounter(e.code, n) : (_.logWarn(_.unsupportedBidderMessage(e, n)),
                                    e.bids = e.bids.filter(function (e) {
                                        return e.bidder !== n
                                    }))
                            }),
                            E.a.incrementRequestsCounter(e.code)
                    }),
                    r && 0 !== r.length) {
                    var c = y.a.createAuction({
                        adUnits: r,
                        adUnitCodes: i,
                        callback: t,
                        cbTimeout: s,
                        labels: o,
                        auctionId: a
                    })
                        , u = r.length;
                    15 < u && _.logInfo("Current auction ".concat(c.getAuctionId(), " contains ").concat(u, " adUnits."), r),
                        i.forEach(function (e) {
                            return S.a.setLatestAuctionForAdUnit(e, c.getAuctionId())
                        }),
                        c.callBids()
                } else if (_.logMessage("No adUnits configured. No bids requested."),
                    "function" == typeof t)
                    try {
                        t()
                    } catch (e) {
                        _.logError("Error executing bidsBackHandler", null, e)
                    }
            }),
            j.requestBids.before(f, 49),
            j.addAdUnits = function (e) {
                _.logInfo("Invoking pbjs.addAdUnits", arguments),
                    _.isArray(e) ? j.adUnits.push.apply(j.adUnits, e) : "object" === r(e) && j.adUnits.push(e),
                    N.emit(P)
            }
            ,
            j.onEvent = function (e, t, n) {
                _.logInfo("Invoking pbjs.onEvent", arguments),
                    _.isFn(t) ? !n || V[e].call(null, n) ? N.on(e, t, n) : _.logError('The id provided is not valid for event "' + e + '" and no handler was set.') : _.logError('The event handler provided is not a function and was not set on event "' + e + '".')
            }
            ,
            j.offEvent = function (e, t, n) {
                _.logInfo("Invoking pbjs.offEvent", arguments),
                    n && !V[e].call(null, n) || N.off(e, t, n)
            }
            ,
            j.getEvents = function () {
                return _.logInfo("Invoking pbjs.getEvents"),
                    N.getEvents()
            }
            ,
            j.registerBidAdapter = function (e, t) {
                _.logInfo("Invoking pbjs.registerBidAdapter", arguments);
                try {
                    D.registerBidAdapter(e(), t)
                } catch (e) {
                    _.logError("Error registering bidder adapter : " + e.message)
                }
            }
            ,
            j.registerAnalyticsAdapter = function (e) {
                _.logInfo("Invoking pbjs.registerAnalyticsAdapter", arguments);
                try {
                    D.registerAnalyticsAdapter(e)
                } catch (e) {
                    _.logError("Error registering analytics adapter : " + e.message)
                }
            }
            ,
            j.createBid = function (e) {
                return _.logInfo("Invoking pbjs.createBid", arguments),
                    Object(A.a)(e)
            }
            ;
        var K = []
            , X = Object(w.b)("async", function (e) {
                e && !_.isEmpty(e) ? (_.logInfo("Invoking pbjs.enableAnalytics for: ", e),
                    D.enableAnalytics(e)) : _.logError("pbjs.enableAnalytics should be called with option {}")
            }, "enableAnalyticsCb");
        j.enableAnalytics = function (e) {
            K.push(X.bind(this, e))
        }
            ,
            j.aliasBidder = function (e, t, n) {
                _.logInfo("Invoking pbjs.aliasBidder", arguments),
                    e && t ? D.aliasBidAdapter(e, t, n) : _.logError("bidderCode and alias must be passed as arguments", "pbjs.aliasBidder")
            }
            ,
            j.getAllWinningBids = function () {
                return y.a.getAllWinningBids()
            }
            ,
            j.getAllPrebidWinningBids = function () {
                return y.a.getBidsReceived().filter(function (e) {
                    return e.status === k.BID_STATUS.BID_TARGETING_SET
                })
            }
            ,
            j.getHighestCpmBids = function (e) {
                return S.a.getWinningBids(e)
            }
            ,
            j.markWinningBidAsUsed = function (e) {
                var t = [];
                e.adUnitCode && e.adId ? t = y.a.getBidsReceived().filter(function (t) {
                    return t.adId === e.adId && t.adUnitCode === e.adUnitCode
                }) : e.adUnitCode ? t = S.a.getWinningBids(e.adUnitCode) : e.adId ? t = y.a.getBidsReceived().filter(function (t) {
                    return t.adId === e.adId
                }) : _.logWarn("Improper use of markWinningBidAsUsed. It needs an adUnitCode or an adId to function."),
                    0 < t.length && (t[0].status = k.BID_STATUS.RENDERED)
            }
            ,
            j.getConfig = b.b.getConfig,
            j.setConfig = b.b.setConfig,
            j.setBidderConfig = b.b.setBidderConfig,
            j.que.push(function () {
                return Object(m.a)()
            }),
            j.cmd.push = function (e) {
                if ("function" == typeof e)
                    try {
                        e.call()
                    } catch (e) {
                        _.logError("Error processing command :", e.message, e.stack)
                    }
                else
                    _.logError("Commands written into pbjs.cmd.push must be wrapped in a function")
            }
            ,
            j.que.push = j.cmd.push,
            j.processQueue = function () {
                w.b.ready(),
                    p(j.que),
                    p(j.cmd)
            }
            ,
            t.default = j
    },
    69: function (e, t, n) {
        "use strict";
        t.a = function (e, t) {
            o.adServers = o.adServers || {},
                o.adServers[e] = o.adServers[e] || {},
                Object.keys(t).forEach(function (n) {
                    o.adServers[e][n] ? Object(i.logWarn)("Attempting to add an already registered function property ".concat(n, " for AdServer ").concat(e, ".")) : o.adServers[e][n] = t[n]
                })
        }
            ;
        var r = n(21)
            , i = n(0)
            , o = Object(r.a)()
    },
    7: function (e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                if (s()(c, a))
                    return e({
                        valid: !0
                    });
                var t;
                return d(r, i, {
                    hasEnforcementHook: !1
                }, function (n) {
                    if (n && n.hasEnforcementHook)
                        t = e(n);
                    else {
                        var r = {
                            hasEnforcementHook: !1,
                            valid: o.hasDeviceAccess()
                        };
                        t = e(r)
                    }
                }),
                    t
            }
            var n = 0 < arguments.length && void 0 !== e ? e : {}
                , r = n.gvlid
                , i = n.moduleName
                , a = n.moduleType
                , l = function (e) {
                    function n(e) {
                        if (e && e.valid)
                            try {
                                return !!window.localStorage
                            } catch (e) {
                                o.logError("Local storage api disabled")
                            }
                        return !1
                    }
                    return e && "function" == typeof e ? void u.push(function () {
                        var r = t(n);
                        e(r)
                    }) : t(n)
                };
            return {
                setCookie: function (e, n, r, i, o, a) {
                    function s(t) {
                        if (t && t.valid) {
                            var a = o && "" !== o ? " ;domain=".concat(encodeURIComponent(o)) : ""
                                , s = r && "" !== r ? " ;expires=".concat(r) : ""
                                , c = null != i && "none" == i.toLowerCase() ? "; Secure" : "";
                            document.cookie = "".concat(e, "=").concat(encodeURIComponent(n)).concat(s, "; path=/").concat(a).concat(i ? "; SameSite=".concat(i) : "").concat(c)
                        }
                    }
                    return a && "function" == typeof a ? void u.push(function () {
                        var e = t(s);
                        a(e)
                    }) : t(s)
                },
                getCookie: function (e, n) {
                    function r(t) {
                        if (t && t.valid) {
                            var n = window.document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]*)\\s*(;|$)");
                            return n ? decodeURIComponent(n[2]) : null
                        }
                        return null
                    }
                    return n && "function" == typeof n ? void u.push(function () {
                        var e = t(r);
                        n(e)
                    }) : t(r)
                },
                localStorageIsEnabled: function (e) {
                    function n(e) {
                        if (e && e.valid)
                            try {
                                return localStorage.setItem("prebid.cookieTest", "1"),
                                    "1" === localStorage.getItem("prebid.cookieTest")
                            } catch (e) { }
                        return !1
                    }
                    return e && "function" == typeof e ? void u.push(function () {
                        var r = t(n);
                        e(r)
                    }) : t(n)
                },
                cookiesAreEnabled: function (e) {
                    function n(e) {
                        return !(!e || !e.valid || !o.checkCookieSupport() && (window.document.cookie = "prebid.cookieTest",
                            -1 === window.document.cookie.indexOf("prebid.cookieTest")))
                    }
                    return e && "function" == typeof e ? void u.push(function () {
                        var r = t(n);
                        e(r)
                    }) : t(n)
                },
                setDataInLocalStorage: function (e, n, r) {
                    function i(t) {
                        t && t.valid && l() && window.localStorage.setItem(e, n)
                    }
                    return r && "function" == typeof r ? void u.push(function () {
                        var e = t(i);
                        r(e)
                    }) : t(i)
                },
                getDataFromLocalStorage: function (e, n) {
                    function r(t) {
                        return t && t.valid && l() ? window.localStorage.getItem(e) : null
                    }
                    return n && "function" == typeof n ? void u.push(function () {
                        var e = t(r);
                        n(e)
                    }) : t(r)
                },
                removeDataFromLocalStorage: function (e, n) {
                    function r(t) {
                        t && t.valid && l() && window.localStorage.removeItem(e)
                    }
                    return n && "function" == typeof n ? void u.push(function () {
                        var e = t(r);
                        n(e)
                    }) : t(r)
                },
                hasLocalStorage: l,
                findSimilarCookies: function (e, n) {
                    function r(t) {
                        if (t && t.valid) {
                            var n = [];
                            if (o.hasDeviceAccess())
                                for (var r = document.cookie.split(";"); r.length;) {
                                    var i = r.pop()
                                        , a = i.indexOf("=");
                                    a = a < 0 ? i.length : a,
                                        0 <= decodeURIComponent(i.slice(0, a).replace(/^\s+/, "")).indexOf(e) && n.push(decodeURIComponent(i.slice(a + 1)))
                                }
                            return n
                        }
                    }
                    return n && "function" == typeof n ? void u.push(function () {
                        var e = t(r);
                        n(e)
                    }) : t(r)
                }
            }
        }
        n.d(t, "c", function () {
            return u
        }),
            n.d(t, "d", function () {
                return d
            }),
            t.a = function (e) {
                return r({
                    moduleName: e,
                    moduleType: "core"
                })
            }
            ,
            t.b = function (e, t) {
                return r({
                    gvlid: e,
                    moduleName: t
                })
            }
            ;
        var i = n(13)
            , o = n(0)
            , a = n(12)
            , s = n.n(a)
            , c = ["core", "prebid-module"]
            , u = []
            , d = Object(i.b)("async", function (e, t, n, r) {
                r(n)
            }, "validateStorageEnforcement")
    },
    70: function (e, t, n) {
        var r = n(30)
            , i = n(48)
            , o = "".split;
        e.exports = r(function () {
            return !Object("z").propertyIsEnumerable(0)
        }) ? function (e) {
            return "String" == i(e) ? o.call(e, "") : Object(e)
        }
            : Object
    },
    71: function (e, t, n) {
        var r = n(29)
            , i = n(30)
            , o = n(72);
        e.exports = !r && !i(function () {
            return 7 != Object.defineProperty(o("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        })
    },
    72: function (e, t, n) {
        var r = n(24)
            , i = n(25)
            , o = r.document
            , a = i(o) && i(o.createElement);
        e.exports = function (e) {
            return a ? o.createElement(e) : {}
        }
    },
    73: function (e, t, n) {
        var r = n(16)
            , i = n(74);
        (e.exports = function (e, t) {
            return i[e] || (i[e] = void 0 !== t ? t : {})
        }
        )("versions", []).push({
            version: "3.6.4",
            mode: r ? "pure" : "global",
            copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
        })
    },
    74: function (e, t, n) {
        var r = n(24)
            , i = n(103)
            , o = "__core-js_shared__"
            , a = r[o] || i(o, {});
        e.exports = a
    },
    75: function (e, t, n) {
        var r = n(30);
        e.exports = !!Object.getOwnPropertySymbols && !r(function () {
            return !String(Symbol())
        })
    },
    76: function (e, t, n) {
        function r(e) {
            return function (t, n, r) {
                var s, c = i(t), u = o(c.length), d = a(r, u);
                if (e && n != n) {
                    for (; d < u;)
                        if ((s = c[d++]) != s)
                            return !0
                } else
                    for (; d < u; d++)
                        if ((e || d in c) && c[d] === n)
                            return e || d || 0;
                return !e && -1
            }
        }
        var i = n(47)
            , o = n(50)
            , a = n(107);
        e.exports = {
            includes: r(!0),
            indexOf: r(!1)
        }
    },
    77: function (e, t, n) {
        var r = n(108);
        n(131),
            n(133),
            n(135),
            n(137),
            n(139),
            n(140),
            n(141),
            n(142),
            n(143),
            n(144),
            n(145),
            n(146),
            n(147),
            n(148),
            n(149),
            n(150),
            n(151),
            n(152),
            e.exports = r
    },
    78: function (e, t, n) {
        function r(e) {
            s(e, d, {
                value: {
                    objectID: "O" + ++l,
                    weakData: {}
                }
            })
        }
        var i = n(53)
            , o = n(25)
            , a = n(26)
            , s = n(33).f
            , c = n(59)
            , u = n(111)
            , d = c("meta")
            , l = 0
            , f = Object.isExtensible || function () {
                return !0
            }
            , p = e.exports = {
                REQUIRED: !1,
                fastKey: function (e, t) {
                    if (!o(e))
                        return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!a(e, d)) {
                        if (!f(e))
                            return "F";
                        if (!t)
                            return "E";
                        r(e)
                    }
                    return e[d].objectID
                },
                getWeakData: function (e, t) {
                    if (!a(e, d)) {
                        if (!f(e))
                            return !0;
                        if (!t)
                            return !1;
                        r(e)
                    }
                    return e[d].weakData
                },
                onFreeze: function (e) {
                    return u && p.REQUIRED && f(e) && !a(e, d) && r(e),
                        e
                }
            };
        i[d] = !0
    },
    79: function (e, t, n) {
        var r = n(19)
            , i = n(38)
            , o = r("iterator")
            , a = Array.prototype;
        e.exports = function (e) {
            return void 0 !== e && (i.Array === e || a[o] === e)
        }
    },
    8: function (e, t, n) {
        function r() {
            return (r = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        var i, o, a = n(0), s = n(5), c = Array.prototype.slice, u = Array.prototype.push, d = a._map(s.EVENTS, function (e) {
            return e
        }), l = s.EVENT_ID_PATHS, f = [];
        e.exports = (i = {},
            (o = {}).on = function (e, t, n) {
                if (o = e,
                    a.contains(d, o)) {
                    var r = i[e] || {
                        que: []
                    };
                    n ? (r[n] = r[n] || {
                        que: []
                    },
                        r[n].que.push(t)) : r.que.push(t),
                        i[e] = r
                } else
                    a.logError("Wrong event name : " + e + " Valid event names :" + d);
                var o
            }
            ,
            o.emit = function (e) {
                !function (e, t) {
                    a.logMessage("Emitting event for: " + e);
                    var n = t[0] || {}
                        , r = n[l[e]]
                        , o = i[e] || {
                            que: []
                        }
                        , s = a._map(o, function (e, t) {
                            return t
                        })
                        , c = [];
                    f.push({
                        eventType: e,
                        args: n,
                        id: r
                    }),
                        r && a.contains(s, r) && u.apply(c, o[r].que),
                        u.apply(c, o.que),
                        a._each(c, function (e) {
                            if (e)
                                try {
                                    e.apply(null, t)
                                } catch (e) {
                                    a.logError("Error executing handler:", "events.js", e)
                                }
                        })
                }(e, c.call(arguments, 1))
            }
            ,
            o.off = function (e, t, n) {
                var r = i[e];
                a.isEmpty(r) || a.isEmpty(r.que) && a.isEmpty(r[n]) || n && (a.isEmpty(r[n]) || a.isEmpty(r[n].que)) || (n ? a._each(r[n].que, function (e) {
                    var i = r[n].que;
                    e === t && i.splice(i.indexOf(e), 1)
                }) : a._each(r.que, function (e) {
                    var n = r.que;
                    e === t && n.splice(n.indexOf(e), 1)
                }),
                    i[e] = r)
            }
            ,
            o.get = function () {
                return i
            }
            ,
            o.getEvents = function () {
                var e = [];
                return a._each(f, function (t) {
                    var n = r({}, t);
                    e.push(n)
                }),
                    e
            }
            ,
            o)
    },
    80: function (e, t, n) {
        var r = n(15);
        e.exports = function (e, t, n, i) {
            try {
                return i ? t(r(n)[0], n[1]) : t(n)
            } catch (t) {
                var o = e.return;
                throw void 0 !== o && r(o.call(e)),
                t
            }
        }
    },
    81: function (e, t) {
        e.exports = function (e, t, n) {
            if (!(e instanceof t))
                throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
            return e
        }
    },
    82: function (e, t, n) {
        function r() { }
        function i(e) {
            return "<script>" + e + "</" + h + ">"
        }
        var o, a = n(15), s = n(116), c = n(83), u = n(53), d = n(119), l = n(72), f = n(65), p = "prototype", h = "script", g = f("IE_PROTO"), m = function () {
            try {
                o = document.domain && new ActiveXObject("htmlfile")
            } catch (e) { }
            var e, t;
            m = o ? function (e) {
                e.write(i("")),
                    e.close();
                var t = e.parentWindow.Object;
                return e = null,
                    t
            }(o) : ((t = l("iframe")).style.display = "none",
                d.appendChild(t),
                t.src = String("javascript:"),
                (e = t.contentWindow.document).open(),
                e.write(i("document.F=Object")),
                e.close(),
                e.F);
            for (var n = c.length; n--;)
                delete m[p][c[n]];
            return m()
        };
        u[g] = !0,
            e.exports = Object.create || function (e, t) {
                var n;
                return null !== e ? (r[p] = a(e),
                    n = new r,
                    r[p] = null,
                    n[g] = e) : n = m(),
                    void 0 === t ? n : s(n, t)
            }
    },
    83: function (e, t) {
        e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    },
    84: function (e, t, n) {
        var r = n(31);
        e.exports = function (e, t, n, i) {
            i && i.enumerable ? e[t] = n : r(e, t, n)
        }
    },
    85: function (e, t, n) {
        "use strict";
        var r, i, o, a = n(86), s = n(31), c = n(26), u = n(19), d = n(16), l = u("iterator"), f = !1;
        [].keys && ("next" in (o = [].keys()) ? (i = a(a(o))) !== Object.prototype && (r = i) : f = !0),
            null == r && (r = {}),
            d || c(r, l) || s(r, l, function () {
                return this
            }),
            e.exports = {
                IteratorPrototype: r,
                BUGGY_SAFARI_ITERATORS: f
            }
    },
    86: function (e, t, n) {
        var r = n(26)
            , i = n(57)
            , o = n(65)
            , a = n(122)
            , s = o("IE_PROTO")
            , c = Object.prototype;
        e.exports = a ? Object.getPrototypeOf : function (e) {
            return e = i(e),
                r(e, s) ? e[s] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? c : null
        }
    },
    87: function (e, t, n) {
        "use strict";
        var r = n(127).charAt
            , i = n(54)
            , o = n(66)
            , a = "String Iterator"
            , s = i.set
            , c = i.getterFor(a);
        o(String, "String", function (e) {
            s(this, {
                type: a,
                string: String(e),
                index: 0
            })
        }, function () {
            var e, t = c(this), n = t.string, i = t.index;
            return i >= n.length ? {
                value: void 0,
                done: !0
            } : (e = r(n, i),
                t.index += e.length,
            {
                value: e,
                done: !1
            })
        })
    },
    88: function (e, t, n) {
        var r = n(15)
            , i = n(61);
        e.exports = function (e) {
            var t = i(e);
            if ("function" != typeof t)
                throw TypeError(String(e) + " is not iterable");
            return r(t.call(e))
        }
    },
    89: function (e, t, n) {
        var r = n(153);
        e.exports = r
    },
    894: function (e, t, n) {
        e.exports = n(68)
    },
    9: function (e, t, n) {
        "use strict";
        function r(e, t) {
            return function (e) {
                if (Array.isArray(e))
                    return e
            }(e) || function (e, t) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
                    var n = []
                        , r = !0
                        , i = !1
                        , o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
                            !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        i = !0,
                            o = e
                    } finally {
                        try {
                            r || null == s.return || s.return()
                        } finally {
                            if (i)
                                throw o
                        }
                    }
                    return n
                }
            }(e, t) || function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        function i() {
            return (i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function o() {
            return A && A.enabled && A.testing && s
        }
        function a(e, t, n) {
            try {
                var r = E[e].getSpec();
                r && r[t] && "function" == typeof r[t] && (w.logInfo("Invoking ".concat(e, ".").concat(t)),
                    p.b.runWithBidder(e, c.bind.call(r[t], r, n)))
            } catch (n) {
                w.logWarn("Error calling ".concat(t, " of ").concat(e))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            n.d(t, "gdprDataHandler", function () {
                return k
            }),
            n.d(t, "uspDataHandler", function () {
                return _
            }),
            t.setS2STestingModule = function (e) {
                s = e
            }
            ;
        var s, c = n(0), u = n(91), d = n(37), l = n(1), f = n(4), p = n(3), h = n(13), g = n(12), m = n.n(g), v = n(10), b = n.n(v), y = n(67), S = n(20), w = n(0), C = n(5), T = n(8), x = {}, E = x.bidderRegistry = {}, I = x.aliasRegistry = {}, A = {};
        p.b.getConfig("s2sConfig", function (e) {
            A = e.s2sConfig
        });
        var O = {}
            , j = Object(h.b)("sync", function (e) {
                var t = e.bidderCode
                    , n = e.auctionId
                    , r = e.bidderRequestId
                    , o = e.adUnits
                    , a = e.labels
                    , s = e.src;
                return o.reduce(function (e, o) {
                    var l = Object(u.b)(Object(u.a)(o, a), o.mediaTypes, o.sizes)
                        , f = l.active
                        , p = l.mediaTypes
                        , h = l.filterResults;
                    return f ? h && w.logInfo('Size mapping filtered adUnit "'.concat(o.code, '" banner sizes from '), h.before, "to ", h.after) : w.logInfo('Size mapping disabled adUnit "'.concat(o.code, '"')),
                        f && e.push(o.bids.filter(function (e) {
                            return e.bidder === t
                        }).reduce(function (e, t) {
                            var l = o.nativeParams || w.deepAccess(o, "mediaTypes.native");
                            l && (t = i({}, t, {
                                nativeParams: Object(d.g)(l)
                            })),
                                t = i({}, t, Object(c.getDefinedParams)(o, ["fpd", "mediaType", "renderer", "storedAuctionResponse"]));
                            var f = Object(u.b)(Object(u.a)(t, a), p)
                                , h = f.active
                                , g = f.mediaTypes
                                , m = f.filterResults;
                            return h ? m && w.logInfo('Size mapping filtered adUnit "'.concat(o.code, '" bidder "').concat(t.bidder, '" banner sizes from '), m.before, "to ", m.after) : w.logInfo('Size mapping deactivated adUnit "'.concat(o.code, '" bidder "').concat(t.bidder, '"')),
                                w.isValidMediaTypes(g) ? t = i({}, t, {
                                    mediaTypes: g
                                }) : w.logError("mediaTypes is not correctly configured for adunit ".concat(o.code)),
                                h && e.push(i({}, t, {
                                    adUnitCode: o.code,
                                    transactionId: o.transactionId,
                                    sizes: w.deepAccess(g, "banner.sizes") || w.deepAccess(g, "video.playerSize") || [],
                                    bidId: t.bid_id || w.getUniqueIdentifierStr(),
                                    bidderRequestId: r,
                                    auctionId: n,
                                    src: s,
                                    bidRequestsCount: y.a.getRequestsCounter(o.code),
                                    bidderRequestsCount: y.a.getBidderRequestsCounter(o.code, t.bidder),
                                    bidderWinsCount: y.a.getBidderWinsCounter(o.code, t.bidder)
                                })),
                                e
                        }, [])),
                        e
                }, []).reduce(c.flatten, []).filter(function (e) {
                    return "" !== e
                })
            }, "getBids")
            , k = {
                consentData: null,
                setConsentData: function (e) {
                    k.consentData = e
                },
                getConsentData: function () {
                    return k.consentData
                }
            }
            , _ = {
                consentData: null,
                setConsentData: function (e) {
                    _.consentData = e
                },
                getConsentData: function () {
                    return _.consentData
                }
            };
        x.makeBidRequests = Object(h.b)("sync", function (e, t, n, r, i) {
            T.emit(C.EVENTS.BEFORE_REQUEST_BIDS, e);
            var a = []
                , u = Object(c.getBidderCodes)(e);
            p.b.getConfig("bidderSequence") === p.a && (u = Object(c.shuffle)(u));
            var d, l, f, h, g = Object(S.a)(), v = u, y = [];
            if (A.enabled) {
                if (o()) {
                    var x = s.getSourceBidderMap(e);
                    y = x[s.CLIENT]
                }
                var I = A.bidders;
                v = u.filter(function (e) {
                    return !m()(I, e) || m()(y, e)
                }),
                    Boolean(o() && A.testServerOnly) && (h = e,
                        Boolean(b()(h, function (e) {
                            return b()(e.bids, function (e) {
                                return (e.bidSource || A.bidderControl && A.bidderControl[e.bidder]) && e.finalSource === s.SERVER
                            })
                        }))) && (v.length = 0);
                var O = (d = e,
                    l = A.bidders,
                    (f = w.deepClone(d)).forEach(function (e) {
                        e.bids = e.bids.filter(function (e) {
                            return m()(l, e.bidder) && (!o() || e.finalSource !== s.CLIENT)
                        }).map(function (e) {
                            return e.bid_id = w.getUniqueIdentifierStr(),
                                e
                        })
                    }),
                    f = f.filter(function (e) {
                        return 0 !== e.bids.length
                    }))
                    , D = w.generateUUID();
                I.forEach(function (e) {
                    var r = w.getUniqueIdentifierStr()
                        , o = {
                            bidderCode: e,
                            auctionId: n,
                            bidderRequestId: r,
                            tid: D,
                            bids: j({
                                bidderCode: e,
                                auctionId: n,
                                bidderRequestId: r,
                                adUnits: w.deepClone(O),
                                labels: i,
                                src: C.S2S.SRC
                            }),
                            auctionStart: t,
                            timeout: A.timeout,
                            src: C.S2S.SRC,
                            refererInfo: g
                        };
                    0 !== o.bids.length && a.push(o)
                }),
                    O.forEach(function (e) {
                        var t = e.bids.filter(function (e) {
                            return b()(a, function (t) {
                                return b()(t.bids, function (t) {
                                    return t.bidId === e.bid_id
                                })
                            })
                        });
                        e.bids = t
                    }),
                    a.forEach(function (e) {
                        e.adUnitsS2SCopy = O.filter(function (e) {
                            return 0 < e.bids.length
                        })
                    })
            }
            var N, U, R = (N = e,
                (U = w.deepClone(N)).forEach(function (e) {
                    e.bids = e.bids.filter(function (e) {
                        return !o() || e.finalSource !== s.SERVER
                    })
                }),
                U = U.filter(function (e) {
                    return 0 !== e.bids.length
                }));
            return v.forEach(function (e) {
                var o = w.getUniqueIdentifierStr()
                    , s = {
                        bidderCode: e,
                        auctionId: n,
                        bidderRequestId: o,
                        bids: j({
                            bidderCode: e,
                            auctionId: n,
                            bidderRequestId: o,
                            adUnits: w.deepClone(R),
                            labels: i,
                            src: "client"
                        }),
                        auctionStart: t,
                        timeout: r,
                        refererInfo: g
                    }
                    , c = E[e];
                c || w.logError("Trying to make a request for bidder that does not exist: ".concat(e)),
                    c && s.bids && 0 !== s.bids.length && a.push(s)
            }),
                k.getConsentData() && a.forEach(function (e) {
                    e.gdprConsent = k.getConsentData()
                }),
                _.getConsentData() && a.forEach(function (e) {
                    e.uspConsent = _.getConsentData()
                }),
                a
        }, "makeBidRequests"),
            x.callBids = function (e, t, n, i, o, a, s) {
                if (t.length) {
                    var u = r(t.reduce(function (e, t) {
                        return e[Number(void 0 !== t.src && t.src === C.S2S.SRC)].push(t),
                            e
                    }, [[], []]), 2)
                        , d = u[0]
                        , l = u[1];
                    if (l.length) {
                        var h = Object(f.b)(a, o ? {
                            request: o.request.bind(null, "s2s"),
                            done: o.done
                        } : void 0)
                            , g = A.bidders
                            , v = E[A.adapter]
                            , b = l[0].tid
                            , y = l[0].adUnitsS2SCopy;
                        if (v) {
                            var S = {
                                tid: b,
                                ad_units: y
                            };
                            if (S.ad_units.length) {
                                var x = l.map(function (e) {
                                    return e.start = Object(c.timestamp)(),
                                        i.bind(e)
                                })
                                    , I = S.ad_units.reduce(function (e, t) {
                                        return e.concat((t.bids || []).reduce(function (e, t) {
                                            return e.concat(t.bidder)
                                        }, []))
                                    }, []);
                                w.logMessage("CALLING S2S HEADER BIDDERS ==== ".concat(g.filter(function (e) {
                                    return m()(I, e)
                                }).join(","))),
                                    l.forEach(function (e) {
                                        T.emit(C.EVENTS.BID_REQUESTED, e)
                                    }),
                                    v.callBids(S, l, function (e, t) {
                                        var r = Object(c.getBidderRequest)(l, t.bidderCode, e);
                                        r && n.call(r, e, t)
                                    }, function () {
                                        return x.forEach(function (e) {
                                            return e()
                                        })
                                    }, h)
                            }
                        } else
                            w.logError("missing " + A.adapter)
                    }
                    d.forEach(function (e) {
                        e.start = Object(c.timestamp)();
                        var t = E[e.bidderCode];
                        w.logMessage("CALLING BIDDER ======= ".concat(e.bidderCode)),
                            T.emit(C.EVENTS.BID_REQUESTED, e);
                        var r = Object(f.b)(a, o ? {
                            request: o.request.bind(null, e.bidderCode),
                            done: o.done
                        } : void 0)
                            , u = i.bind(e);
                        try {
                            p.b.runWithBidder(e.bidderCode, c.bind.call(t.callBids, t, e, n.bind(e), u, r, s, p.b.callbackWithBidder(e.bidderCode)))
                        } catch (t) {
                            w.logError("".concat(e.bidderCode, " Bid Adapter emitted an uncaught error when parsing their bidRequest"), {
                                e: t,
                                bidRequest: e
                            }),
                                u()
                        }
                    })
                } else
                    w.logWarn("callBids executed with no bidRequests.  Were they filtered by labels or sizing?")
            }
            ,
            x.videoAdapters = [],
            x.registerBidAdapter = function (e, t) {
                var n = (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}).supportedMediaTypes
                    , r = void 0 === n ? [] : n;
                e && t ? "function" == typeof e.callBids ? (E[t] = e,
                    m()(r, "video") && x.videoAdapters.push(t),
                    m()(r, "native") && d.e.push(t)) : w.logError("Bidder adaptor error for bidder code: " + t + "bidder must implement a callBids() function") : w.logError("bidAdaptor or bidderCode not specified")
            }
            ,
            x.aliasBidAdapter = function (e, t, n) {
                var r, o;
                if (void 0 === E[t]) {
                    var a = E[e];
                    if (void 0 === a) {
                        var s = p.b.getConfig("s2sConfig")
                            , c = s && s.bidders;
                        c && m()(c, t) ? I[t] = e : w.logError('bidderCode "' + e + '" is not an existing bidder.', "adapterManager.aliasBidAdapter")
                    } else
                        try {
                            var u, f = (r = e,
                                o = [],
                                m()(x.videoAdapters, r) && o.push("video"),
                                m()(d.e, r) && o.push("native"),
                                o);
                            if (a.constructor.prototype != Object.prototype)
                                (u = new a.constructor).setBidderCode(t);
                            else {
                                var h = a.getSpec()
                                    , g = n && n.gvlid;
                                u = Object(l.newBidder)(i({}, h, {
                                    code: t,
                                    gvlid: g
                                })),
                                    I[t] = e
                            }
                            x.registerBidAdapter(u, t, {
                                supportedMediaTypes: f
                            })
                        } catch (t) {
                            w.logError(e + " bidder does not currently support aliasing.", "adapterManager.aliasBidAdapter")
                        }
                } else
                    w.logMessage('alias name "' + t + '" has been already specified.')
            }
            ,
            x.registerAnalyticsAdapter = function (e) {
                var t = e.adapter
                    , n = e.code
                    , r = e.gvlid;
                t && n ? "function" == typeof t.enableAnalytics ? (t.code = n,
                    O[n] = {
                        adapter: t,
                        gvlid: r
                    }) : w.logError('Prebid Error: Analytics adaptor error for analytics "'.concat(n, '"\n        analytics adapter must implement an enableAnalytics() function')) : w.logError("Prebid Error: analyticsAdapter or analyticsCode not specified")
            }
            ,
            x.enableAnalytics = function (e) {
                w.isArray(e) || (e = [e]),
                    w._each(e, function (e) {
                        var t = O[e.provider].adapter;
                        t ? t.enableAnalytics(e) : w.logError("Prebid Error: no analytics adapter found in registry for\n        ".concat(e.provider, "."))
                    })
            }
            ,
            x.getBidAdapter = function (e) {
                return E[e]
            }
            ,
            x.getAnalyticsAdapter = function (e) {
                return O[e]
            }
            ,
            x.callTimedOutBidders = function (e, t, n) {
                t = t.map(function (t) {
                    return t.params = w.getUserConfiguredParams(e, t.adUnitCode, t.bidder),
                        t.timeout = n,
                        t
                }),
                    t = w.groupBy(t, "bidder"),
                    Object.keys(t).forEach(function (e) {
                        a(e, "onTimeout", t[e])
                    })
            }
            ,
            x.callBidWonBidder = function (e, t, n) {
                t.params = w.getUserConfiguredParams(n, t.adUnitCode, t.bidder),
                    y.a.incrementBidderWinsCounter(t.adUnitCode, t.bidder),
                    a(e, "onBidWon", t)
            }
            ,
            x.callSetTargetingBidder = function (e, t) {
                a(e, "onSetTargeting", t)
            }
            ,
            t.default = x
    },
    90: function (e, t, n) {
        "use strict";
        t.a = function (e) {
            var t = e;
            return {
                callBids: function () { },
                setBidderCode: function (e) {
                    t = e
                },
                getBidderCode: function () {
                    return t
                }
            }
        }
    },
    91: function (e, t, n) {
        "use strict";
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
            )(e)
        }
        function i(e) {
            return e.reduce(function (e, t) {
                if ("object" === r(t) && "string" == typeof t.mediaQuery) {
                    var n = !1;
                    if ("" === t.mediaQuery)
                        n = !0;
                    else
                        try {
                            n = Object(a.getWindowTop)().matchMedia(t.mediaQuery).matches
                        } catch (e) {
                            Object(a.logWarn)("Unfriendly iFrame blocks sizeConfig from being correctly evaluated"),
                                n = matchMedia(t.mediaQuery).matches
                        }
                    n && (Array.isArray(t.sizesSupported) && (e.shouldFilter = !0),
                        ["labels", "sizesSupported"].forEach(function (n) {
                            return (t[n] || []).forEach(function (t) {
                                return e[n][t] = !0
                            })
                        }))
                } else
                    Object(a.logWarn)('sizeConfig rule missing required property "mediaQuery"');
                return e
            }, {
                labels: {},
                sizesSupported: {},
                shouldFilter: !1
            })
        }
        t.a = function (e, t) {
            return e.labelAll ? {
                labelAll: !0,
                labels: e.labelAll,
                activeLabels: t
            } : {
                labelAll: !1,
                labels: e.labelAny,
                activeLabels: t
            }
        }
            ,
            t.c = function (e) {
                var t = i(1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : u);
                return !t.shouldFilter || !!t.sizesSupported[e]
            }
            ,
            t.b = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = e.labels
                    , n = void 0 === t ? [] : t
                    , r = e.labelAll
                    , o = void 0 !== r && r
                    , s = e.activeLabels
                    , d = void 0 === s ? [] : s
                    , l = 1 < arguments.length ? arguments[1] : void 0
                    , f = 2 < arguments.length ? arguments[2] : void 0
                    , p = i(3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : u);
                l = Object(a.isPlainObject)(l) ? Object(a.deepClone)(l) : f ? {
                    banner: {
                        sizes: f
                    }
                } : {};
                var h = Object(a.deepAccess)(l, "banner.sizes");
                p.shouldFilter && h && (l.banner.sizes = h.filter(function (e) {
                    return p.sizesSupported[e]
                }));
                var g = Object.keys(l)
                    , m = {
                        active: g.every(function (e) {
                            return "banner" !== e
                        }) || g.some(function (e) {
                            return "banner" === e
                        }) && 0 < Object(a.deepAccess)(l, "banner.sizes.length") && (0 === n.length || !o && (n.some(function (e) {
                            return p.labels[e]
                        }) || n.some(function (e) {
                            return c()(d, e)
                        })) || o && n.reduce(function (e, t) {
                            return e ? p.labels[t] || c()(d, t) : e
                        }, !0)),
                        mediaTypes: l
                    };
                return h && h.length !== l.banner.sizes.length && (m.filterResults = {
                    before: h,
                    after: l.banner.sizes
                }),
                    m
            }
            ;
        var o = n(3)
            , a = n(0)
            , s = n(12)
            , c = n.n(s)
            , u = [];
        o.b.getConfig("sizeConfig", function (e) {
            return t = e.sizeConfig,
                void (u = t);
            var t
        })
    },
    92: function (e, t, n) {
        var r = n(219);
        e.exports = r
    },
    93: function (e, t, n) {
        "use strict";
        function r(e) {
            var t, n, r, i = {
                type: "xml",
                value: e.vastXml ? e.vastXml : (t = e.vastUrl,
                    n = e.vastImpUrl,
                    r = n ? "<![CDATA[".concat(n, "]]>") : "",
                    '<VAST version="3.0">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA['.concat(t, "]]></VASTAdTagURI>\n        <Impression>").concat(r, "</Impression>\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>")),
                ttlseconds: Number(e.ttl)
            };
            return o.b.getConfig("cache.vasttrack") && (i.bidder = e.bidder,
                i.bidid = e.requestId,
                a.isPlainObject(this) && this.hasOwnProperty("auctionStart") && (i.timestamp = this.auctionStart)),
                "string" == typeof e.customCacheKey && "" !== e.customCacheKey && (i.key = e.customCacheKey),
                i
        }
        t.b = function (e, t, n) {
            var a = {
                puts: e.map(r, n)
            };
            Object(i.a)(o.b.getConfig("cache.url"), function (e) {
                return {
                    success: function (t) {
                        var n;
                        try {
                            n = JSON.parse(t).responses
                        } catch (t) {
                            return void e(t, [])
                        }
                        n ? e(null, n) : e(new Error("The cache server didn't respond with a responses property."), [])
                    },
                    error: function (t, n) {
                        e(new Error("Error storing video ad in the cache: ".concat(t, ": ").concat(JSON.stringify(n))), [])
                    }
                }
            }(t), JSON.stringify(a), {
                contentType: "text/plain",
                withCredentials: !0
            })
        }
            ,
            t.a = function (e) {
                return "".concat(o.b.getConfig("cache.url"), "?uuid=").concat(e)
            }
            ;
        var i = n(4)
            , o = n(3)
            , a = n(0)
    },
    96: function (e, t, n) {
        n(97);
        var r = n(52);
        e.exports = r("Array", "find")
    },
    97: function (e, t, n) {
        "use strict";
        var r = n(14)
            , i = n(56).find
            , o = n(51)
            , a = n(60)
            , s = "find"
            , c = !0
            , u = a(s);
        s in [] && Array(1).find(function () {
            c = !1
        }),
            r({
                target: "Array",
                proto: !0,
                forced: c || !u
            }, {
                find: function (e, t) {
                    return i(this, e, 1 < arguments.length ? t : void 0)
                }
            }),
            o(s)
    },
    98: function (e, t, n) {
        var r = n(29)
            , i = n(99)
            , o = n(46)
            , a = n(47)
            , s = n(55)
            , c = n(26)
            , u = n(71)
            , d = Object.getOwnPropertyDescriptor;
        t.f = r ? d : function (e, t) {
            if (e = a(e),
                t = s(t, !0),
                u)
                try {
                    return d(e, t)
                } catch (e) { }
            if (c(e, t))
                return o(!i.f.call(e, t), e[t])
        }
    },
    99: function (e, t, n) {
        "use strict";
        var r = {}.propertyIsEnumerable
            , i = Object.getOwnPropertyDescriptor
            , o = i && !r.call({
                1: 2
            }, 1);
        t.f = o ? function (e) {
            var t = i(this, e);
            return !!t && t.enumerable
        }
            : r
    }
}),
    pbjsChunk([316], {
        259: function (e, t, n) {
            e.exports = n(260)
        },
        260: function (e, t, n) {
            "use strict";
            function r(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter(function (t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })),
                        n.push.apply(n, r)
                }
                return n
            }
            function i(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e
            }
            function o(e) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                )(e)
            }
            function a(e, t) {
                return null == e ? [] : e.map(t).reduce(function (e, t) {
                    return null != t && e.concat(t)
                }, [])
            }
            function s(e) {
                return null != (t = e.adm) && S.test(t) ? p.d : p.b;
                var t
            }
            function c(e, t) {
                return null == e || o(e) === t
            }
            function u(e) {
                var t = {};
                return Object(h._each)(e, function (e) {
                    t[e.bidId] = function (e) {
                        var t = C(e.sizes, e.mediaTypes) || [0, 0]
                            , n = e.mediaType === p.d || p.d in e.mediaTypes
                            , r = n || 100 < t[1]
                            , i = Object(h.deepAccess)(e, "params.tagId")
                            , o = null != e.params && "string" == typeof e.params.adUnitId ? e.params.adUnitId : e.adUnitCode
                            , a = [e.sizes, Object(h.deepAccess)(e, "mediaTypes.".concat(p.b, ".sizes"), []) || [], Object(h.deepAccess)(e, "mediaTypes.".concat(p.d, ".sizes"), []) || []]
                            , s = {
                                au: o,
                                av: r,
                                vr: n,
                                ms: a,
                                aw: t[0],
                                ah: t[1],
                                tf: 0
                            };
                        return "string" == typeof i && 0 < i.length && (s.i = i),
                            s
                    }(e)
                }),
                    t
            }
            function d(e, t) {
                return Object(h.triggerPixel)("".concat("https://1x1.a-mo.net/hbx/", "g_").concat(e, "?").concat(Object(h.formatQS)(function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? r(Object(n), !0).forEach(function (t) {
                            i(e, t, n[t])
                        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function (t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                        })
                    }
                    return e
                }({}, t, {
                    ts: Date.now(),
                    eid: Object(h.getUniqueIdentifierStr)()
                }))))
            }
            function l(e) {
                if ("undefined" == typeof DOMParser || null == DOMParser.prototype.parseFromString)
                    return function (e) {
                        var t = [];
                        Object(h._each)([e.nurl].concat(null != e.ext && null != e.ext.himp ? e.ext.himp : []), function (e) {
                            null != e && t.push("<Impression><![CDATA[".concat(e, "]]></Impression>"))
                        });
                        var n = e.adm.indexOf("<Impression");
                        return e.adm.slice(0, n) + t.join("") + e.adm.slice(n)
                    }(e);
                var t = (new DOMParser).parseFromString(e.adm, "text/xml");
                if (null == t || null != t.querySelector("parsererror"))
                    return null;
                var n = t.querySelector("InLine,Wrapper");
                if (null == n)
                    return null;
                var r = [e.nurl].concat(null != e.ext && null != e.ext.himp ? e.ext.himp : []).filter(function (e) {
                    return null != e
                });
                Object(h._each)(r, function (e) {
                    var r = t.createElement("Impression")
                        , i = t.createCDATASection(e);
                    r.appendChild(i),
                        n.appendChild(r)
                });
                var i, o, a = y.exec(e.adm);
                return (null != a ? a[0] : '<?xml version="'.concat((o = t).xmlVersion, '" encoding="').concat(o.xmlEncoding, '" ?>')) + ("outerHTML" in (i = t.documentElement) && null != i.outerHTML ? i.outerHTML : (new XMLSerializer).serializeToString(i))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "spec", function () {
                    return x
                });
            var f = n(1)
                , p = n(2)
                , h = n(0)
                , g = n(3)
                , m = n(7)
                , v = Object(m.b)(737, "amx")
                , b = /\.co\.\w{2,4}$/
                , y = /^\s*<\?xml[^\?]+\?>/
                , S = /^\s*<\??(?:vast|xml)/i
                , w = "__amuidpb"
                , C = function (e, t) {
                    return e.concat(Object(h.deepAccess)(t, "".concat(p.b, ".sizes"), []) || []).concat(Object(h.deepAccess)(t, "".concat(p.d, ".sizes"), []) || []).sort(function (e, t) {
                        return t[0] * t[1] - e[0] * e[1]
                    })[0]
                }
                , T = encodeURIComponent
                , x = {
                    code: "amx",
                    supportedMediaTypes: [p.b, p.d],
                    isBidRequestValid: function (e) {
                        return c(Object(h.deepAccess)(e, "params.endpoint", null), "string") && c(Object(h.deepAccess)(e, "params.tagId", null), "string") && c(Object(h.deepAccess)(e, "params.testMode", null), "boolean")
                    },
                    buildRequests: function (e, t) {
                        var n, r, i, o, a, s = (n = t,
                            Object(h.parseUrl)(Object(h.deepAccess)(n, "refererInfo.canonicalUrl", location.href))), c = Object(h.deepAccess)(e[0], "params.tagId", null), d = Object(h.deepAccess)(e[0], "params.testMode", 0), l = null != e[0] ? e[0] : {
                                bidderRequestsCount: 0,
                                bidderWinsCount: 0,
                                bidRequestsCount: 0
                            };
                        return {
                            data: {
                                a: t.auctionId,
                                B: 0,
                                b: s.host,
                                brc: l.bidderRequestsCount || 0,
                                bwc: l.bidderWinsCount || 0,
                                trc: l.bidRequestsCount || 0,
                                tm: d,
                                V: "4.14.0",
                                i: d && null != c ? c : (o = (i = s).hostname.split("."),
                                    a = o.slice(o.length - (b.test(i.host) ? 3 : 2)).join("."),
                                    btoa(a).replace(/=+$/, "")),
                                l: {},
                                f: .01,
                                cv: "pba1.2",
                                st: "prebid",
                                h: screen.height,
                                w: screen.width,
                                gs: Object(h.deepAccess)(t, "gdprConsent.gdprApplies", ""),
                                gc: Object(h.deepAccess)(t, "gdprConsent.consentString", ""),
                                u: Object(h.deepAccess)(t, "refererInfo.canonicalUrl", s.href),
                                do: s.host,
                                re: Object(h.deepAccess)(t, "refererInfo.referer"),
                                am: function () {
                                    try {
                                        return v.getDataFromLocalStorage(w)
                                    } catch (e) {
                                        return null
                                    }
                                }(),
                                usp: t.uspConsent || "1---",
                                smt: 1,
                                d: "",
                                m: u(e),
                                cpp: g.b.getConfig("coppa") ? 1 : 0,
                                fpd: g.b.getConfig("fpd"),
                                eids: (r = e.reduce(function (e, t) {
                                    return null == t || null == t.userIdAsEids || Object(h._each)(t.userIdAsEids, function (t) {
                                        null != t && (e[t.source] = t)
                                    }),
                                        e
                                }, {}),
                                    null != Object.values ? Object.values(r) : Object.keys(r).map(function (e) {
                                        return r[e]
                                    }))
                            },
                            method: "POST",
                            url: Object(h.deepAccess)(e[0], "params.endpoint", "https://prebid.a-mo.net/a/c"),
                            withCredentials: !0
                        }
                    },
                    getUserSyncs: function (e, t) {
                        if (null == t || 0 === t.length)
                            return [];
                        var n = [];
                        return Object(h._each)(t, function (t) {
                            var r = t.body;
                            null != r && null != r.p && r.p.hreq && Object(h._each)(r.p.hreq, function (t) {
                                var r = -1 !== t.indexOf("__st=iframe") ? "iframe" : "image";
                                !e.iframeEnabled && "image" != r || n.push({
                                    url: t,
                                    type: r
                                })
                            })
                        }),
                            n
                    },
                    interpretResponse: function (e, t) {
                        var n = e.body;
                        return null == n || "string" == typeof n ? [] : (n.am && "string" == typeof n.am && function (e) {
                            try {
                                v.setDataInLocalStorage(w, e)
                            } catch (e) { }
                        }(n.am),
                            a(Object.keys(n.r), function (e) {
                                return a(n.r[e], function (n) {
                                    return n.b.map(function (n) {
                                        var r, o, a, c = s(n), u = c === p.b ? (o = n,
                                            a = Object(h.deepAccess)(o, "ext.himp", []).concat(null != o.nurl ? [o.nurl] : []).filter(function (e) {
                                                return null != e && 0 < e.length
                                            }).map(function (e) {
                                                return '<img src="'.concat(e, '" width="0" height="0"/>')
                                            }).join(""),
                                            o.adm + a) : l(n);
                                        if (null == u)
                                            return null;
                                        var d = function (e, t, n) {
                                            if (null != e.w && 1 < e.w && null != e.h && 1 < e.h)
                                                return [e.w, e.h];
                                            var r = t.m[n];
                                            return null == r ? [0, 0] : [r.aw, r.ah]
                                        }(n, t.data, e);
                                        return i(r = {
                                            requestId: e,
                                            cpm: n.price,
                                            width: d[0],
                                            height: d[1],
                                            creativeId: n.crid,
                                            currency: "USD",
                                            netRevenue: !0
                                        }, c === p.d ? "vastXml" : "ad", u),
                                            i(r, "meta", {
                                                advertiserDomains: n.adomain,
                                                mediaType: c
                                            }),
                                            i(r, "ttl", c === p.d ? 90 : 70),
                                            r
                                    })
                                }).filter(function (e) {
                                    return null != e
                                })
                            }))
                    },
                    onSetTargeting: function (e) {
                        var t, n;
                        null != e && d("pbst", {
                            A: e.bidder,
                            w: e.width,
                            h: e.height,
                            bid: e.adId,
                            c1: e.mediaType,
                            np: e.cpm,
                            aud: e.requestId,
                            a: e.adUnitCode,
                            c2: (t = e.adserverTargeting,
                                n = [],
                                Object.keys(t || {}).forEach(function (e) {
                                    n.push(T(e) + "=" + T(String(t[e])))
                                }),
                                T(n.join("&")))
                        })
                    },
                    onTimeout: function (e) {
                        null != e && d("pbto", {
                            A: e.bidder,
                            bid: e.bidId,
                            a: e.adUnitCode,
                            cn: e.timeout,
                            aud: e.auctionId
                        })
                    },
                    onBidWon: function (e) {
                        null != e && d("pbwin", {
                            A: e.bidder,
                            w: e.width,
                            h: e.height,
                            bid: e.adId,
                            C: e.mediaType === p.b ? 0 : 1,
                            np: e.cpm,
                            a: e.adUnitCode
                        })
                    }
                };
            Object(f.registerBidder)(x)
        }
    }, [259]),
    pbjsChunk([312], {
        271: function (e, t, n) {
            e.exports = n(272)
        },
        272: function (e, t, n) {
            "use strict";
            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                )(e)
            }
            function i() {
                return (i = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }
                ).apply(this, arguments)
            }
            function o(e) {
                return function (e) {
                    if (Array.isArray(e)) {
                        for (var t = 0, n = new Array(e.length); t < e.length; t++)
                            n[t] = e[t];
                        return n
                    }
                }(e) || function (e) {
                    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
                        return Array.from(e)
                }(e) || function () {
                    throw new TypeError("Invalid attempt to spread non-iterable instance")
                }()
            }
            function a(e) {
                return w.isArray(e) && 0 < e.length
            }
            function s(e) {
                a(e.value) && "" === e.value[0] && delete e.value
            }
            function c(e) {
                var t = e.match(L)
                    , n = null != t && 1 <= t.length
                    , r = e.match($)
                    , i = null != r && 1 <= r.length;
                return e.startsWith(z) && i && n
            }
            function u(e) {
                var t, n, r = {};
                if (r.sizes = d(e.sizes),
                    r.primary_size = r.sizes[0],
                    r.ad_types = [],
                    r.uuid = e.bidId,
                    e.params.placementId ? r.id = parseInt(e.params.placementId, 10) : r.code = e.params.invCode,
                    r.allow_smaller_sizes = e.params.allowSmallerSizes || !1,
                    r.use_pmt_rule = e.params.usePaymentRule || !1,
                    r.prebid = !0,
                    r.disable_psa = !0,
                    e.params.reserve && (r.reserve = e.params.reserve),
                    e.params.position && (r.position = {
                        above: 1,
                        below: 2
                    }[e.params.position] || 0),
                    e.params.trafficSourceCode && (r.traffic_source_code = e.params.trafficSourceCode),
                    e.params.privateSizes && (r.private_sizes = d(e.params.privateSizes)),
                    e.params.supplyType && (r.supply_type = e.params.supplyType),
                    e.params.pubClick && (r.pubclick = e.params.pubClick),
                    e.params.extInvCode && (r.ext_inv_code = e.params.extInvCode),
                    e.params.publisherId && (r.publisher_id = parseInt(e.params.publisherId, 10)),
                    e.params.externalImpId && (r.external_imp_id = e.params.externalImpId),
                    !w.isEmpty(e.params.keywords)) {
                    var o = w.transformBidderParamKeywords(e.params.keywords);
                    0 < o.length && o.forEach(s),
                        r.keywords = o
                }
                if ((e.mediaType === x.c || w.deepAccess(e, "mediaTypes.".concat(x.c))) && (r.ad_types.push(x.c),
                    0 === r.sizes.length && (r.sizes = d([1, 1])),
                    e.nativeParams)) {
                    var a = (t = e.nativeParams,
                        n = {},
                        Object.keys(t).forEach(function (e) {
                            var r = q[e] && q[e].serverName || q[e] || e
                                , o = q[e] && q[e].requiredParams;
                            if (n[r] = i({}, o, t[e]),
                                (r === q.image.serverName || r === q.icon.serverName) && n[r].sizes) {
                                var a = n[r].sizes;
                                (w.isArrayOfNums(a) || w.isArray(a) && 0 < a.length && a.every(function (e) {
                                    return w.isArrayOfNums(e)
                                })) && (n[r].sizes = d(n[r].sizes))
                            }
                            r === q.privacyLink && (n.privacy_supported = !0)
                        }),
                        n);
                    r[x.c] = {
                        layouts: [a]
                    }
                }
                var c = w.deepAccess(e, "mediaTypes.".concat(x.d))
                    , u = w.deepAccess(e, "mediaTypes.video.context");
                r.hb_source = c && "adpod" === u ? 7 : 1,
                    e.mediaType !== x.d && !c || r.ad_types.push(x.d),
                    (e.mediaType === x.d || c && "outstream" !== u) && (r.require_asset_url = !0),
                    e.params.video && (r.video = {},
                        Object.keys(e.params.video).filter(function (e) {
                            return j()(U, e)
                        }).forEach(function (t) {
                            switch (t) {
                                case "context":
                                case "playback_method":
                                    var n = e.params.video[t];
                                    n = w.isArray(n) ? n[0] : n,
                                        r.video[t] = M[t][n];
                                    break;
                                case "frameworks":
                                    break;
                                default:
                                    r.video[t] = e.params.video[t]
                            }
                        }),
                        e.params.video.frameworks && w.isArray(e.params.video.frameworks) && (r.video_frameworks = e.params.video.frameworks)),
                    e.renderer && (r.video = i({}, r.video, {
                        custom_renderer_present: !0
                    })),
                    e.params.frameworks && w.isArray(e.params.frameworks) && (r.banner_frameworks = e.params.frameworks);
                var l = A()(E.a.getAdUnits(), function (t) {
                    return e.transactionId === t.transactionId
                });
                return l && l.mediaTypes && l.mediaTypes.banner && r.ad_types.push(x.b),
                    0 === r.ad_types.length && delete r.ad_types,
                    r
            }
            function d(e) {
                var t = []
                    , n = {};
                if (w.isArray(e) && 2 === e.length && !w.isArray(e[0]))
                    n.width = parseInt(e[0], 10),
                        n.height = parseInt(e[1], 10),
                        t.push(n);
                else if ("object" === r(e))
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        (n = {}).width = parseInt(o[0], 10),
                            n.height = parseInt(o[1], 10),
                            t.push(n)
                    }
                return t
            }
            function l(e) {
                return !!e.params.user
            }
            function f(e) {
                return !!parseInt(e.params.member, 10)
            }
            function p(e) {
                if (e.params)
                    return !!e.params.app
            }
            function h(e) {
                return e.params && e.params.app ? !!e.params.app.id : !!e.params.app
            }
            function g(e) {
                return !!e.debug
            }
            function m(e) {
                return e.mediaTypes && e.mediaTypes.video && e.mediaTypes.video.context === x.a
            }
            function v(e) {
                var t = !1
                    , n = e.params
                    , r = e.params.video;
                return n.frameworks && w.isArray(n.frameworks) && (t = j()(e.params.frameworks, 6)),
                    !t && r && r.frameworks && w.isArray(r.frameworks) && (t = j()(e.params.video.frameworks, 6)),
                    t
            }
            function b(e, t, n) {
                w.isEmpty(e.video) && (e.video = {}),
                    e.video[t] = n
            }
            function y(e) {
                var t, n;
                t = e.adUnitCode,
                    (n = document.getElementById(t).querySelectorAll("div[id^='google_ads']"))[0] && n[0].style.setProperty("display", "none"),
                    e.renderer.push(function () {
                        window.ANOutstreamVideo.renderAd({
                            tagId: e.adResponse.tag_id,
                            sizes: [e.getSize().split("x")],
                            targetId: e.adUnitCode,
                            uuid: e.adResponse.uuid,
                            adResponse: e.adResponse,
                            rendererOptions: e.renderer.getConfig()
                        }, function (e, t, n) {
                            e.renderer.handleVideoEvent({
                                id: t,
                                eventName: n
                            })
                        }
                            .bind(null, e))
                    })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "spec", function () {
                    return H
                });
            var S = n(11)
                , w = n(0)
                , C = n(3)
                , T = n(1)
                , x = n(2)
                , E = n(23)
                , I = n(10)
                , A = n.n(I)
                , O = n(12)
                , j = n.n(O)
                , k = n(28)
                , _ = n(7)
                , D = "appnexus"
                , N = "https://ib.adnxs.com/ut/v3/prebid"
                , U = ["id", "minduration", "maxduration", "skippable", "playback_method", "frameworks", "context", "skipoffset"]
                , R = ["age", "externalUid", "segments", "gender", "dnt", "language"]
                , P = ["geo", "device_id"]
                , B = ["enabled", "dongle", "member_id", "debug_timeout"]
                , M = {
                    playback_method: {
                        unknown: 0,
                        auto_play_sound_on: 1,
                        auto_play_sound_off: 2,
                        click_to_play: 3,
                        mouse_over: 4,
                        auto_play_sound_unknown: 5
                    },
                    context: {
                        unknown: 0,
                        pre_roll: 1,
                        mid_roll: 2,
                        post_roll: 3,
                        outstream: 4,
                        "in-banner": 5
                    }
                }
                , q = {
                    body: "description",
                    body2: "desc2",
                    cta: "ctatext",
                    image: {
                        serverName: "main_image",
                        requiredParams: {
                            required: !0
                        }
                    },
                    icon: {
                        serverName: "icon",
                        requiredParams: {
                            required: !0
                        }
                    },
                    sponsoredBy: "sponsored_by",
                    privacyLink: "privacy_link",
                    salePrice: "saleprice",
                    displayUrl: "displayurl"
                }
                , z = "<script"
                , L = /\/\/cdn\.adnxs\.com\/v/
                , $ = "trk.js"
                , F = Object(_.b)(32, D)
                , H = {
                    code: D,
                    gvlid: 32,
                    aliases: [{
                        code: "appnexusAst",
                        gvlid: 32
                    }, {
                        code: "brealtime"
                    }, {
                        code: "emxdigital",
                        gvlid: 183
                    }, {
                        code: "pagescience"
                    }, {
                        code: "defymedia"
                    }, {
                        code: "gourmetads"
                    }, {
                        code: "matomy"
                    }, {
                        code: "featureforward"
                    }, {
                        code: "oftmedia"
                    }, {
                        code: "districtm",
                        gvlid: 144
                    }, {
                        code: "adasta"
                    }, {
                        code: "beintoo",
                        gvlid: 618
                    }],
                    supportedMediaTypes: [x.b, x.d, x.c],
                    isBidRequestValid: function (e) {
                        return !!(e.params.placementId || e.params.member && e.params.invCode)
                    },
                    buildRequests: function (e, t) {
                        var n = e.map(u)
                            , r = A()(e, l)
                            , i = {};
                        !0 === C.b.getConfig("coppa") && (i = {
                            coppa: !0
                        }),
                            r && Object.keys(r.params.user).filter(function (e) {
                                return j()(R, e)
                            }).forEach(function (e) {
                                var t = w.convertCamelToUnderscore(e);
                                i[t] = r.params.user[e]
                            });
                        var a, s = A()(e, p);
                        s && s.params && s.params.app && (a = {},
                            Object.keys(s.params.app).filter(function (e) {
                                return j()(P, e)
                            }).forEach(function (e) {
                                return a[e] = s.params.app[e]
                            }));
                        var c, d = A()(e, h);
                        d && d.params && s.params.app && s.params.app.id && (c = {
                            appid: d.params.app.id
                        });
                        var y = {}
                            , S = {}
                            , T = F.getCookie("apn_prebid_debug") || null;
                        if (T)
                            try {
                                y = JSON.parse(T)
                            } catch (e) {
                                w.logError("AppNexus Debug Auction Cookie Error:\n\n" + e)
                            }
                        else {
                            var x = A()(e, g);
                            x && x.debug && (y = x.debug)
                        }
                        y && y.enabled && Object.keys(y).filter(function (e) {
                            return j()(B, e)
                        }).forEach(function (e) {
                            S[e] = y[e]
                        });
                        var E = A()(e, f)
                            , I = E ? parseInt(E.params.member, 10) : 0
                            , O = e[0].schain
                            , k = A()(e, v)
                            , _ = {
                                tags: o(n),
                                user: i,
                                sdk: {
                                    source: "pbjs",
                                    version: "4.14.0"
                                },
                                schain: O
                            };
                        if (k && (_.iab_support = {
                            omidpn: "Appnexus",
                            omidpv: "4.14.0"
                        }),
                            0 < I && (_.member_id = I),
                            s && (_.device = a),
                            d && (_.app = c),
                            C.b.getConfig("adpod.brandCategoryExclusion") && (_.brand_category_uniqueness = !0),
                            S.enabled && (_.debug = S,
                                w.logInfo("AppNexus Debug Auction Settings:\n\n" + JSON.stringify(S, null, 4))),
                            t && t.gdprConsent && (_.gdpr_consent = {
                                consent_string: t.gdprConsent.consentString,
                                consent_required: t.gdprConsent.gdprApplies
                            }),
                            t && t.uspConsent && (_.us_privacy = t.uspConsent),
                            t && t.refererInfo) {
                            var D = {
                                rd_ref: encodeURIComponent(t.refererInfo.referer),
                                rd_top: t.refererInfo.reachedTop,
                                rd_ifs: t.refererInfo.numIframes,
                                rd_stk: t.refererInfo.stack.map(function (e) {
                                    return encodeURIComponent(e)
                                }).join(",")
                            };
                            _.referrer_detection = D
                        }
                        A()(e, m) && e.filter(m).forEach(function (e) {
                            var t = function (e, t) {
                                var n = t.mediaTypes.video
                                    , r = n.durationRangeSec
                                    , i = n.requireExactDuration
                                    , a = function (e) {
                                        var t = e.adPodDurationSec
                                            , n = e.durationRangeSec
                                            , r = e.requireExactDuration
                                            , i = w.getMinValueFromArray(n)
                                            , o = Math.floor(t / i);
                                        return r ? Math.max(o, n.length) : o
                                    }(t.mediaTypes.video)
                                    , s = w.getMaxValueFromArray(r)
                                    , c = e.filter(function (e) {
                                        return e.uuid === t.bidId
                                    })
                                    , u = w.fill.apply(w, o(c).concat([a]));
                                if (i) {
                                    var d = Math.ceil(a / r.length)
                                        , l = w.chunk(u, d);
                                    r.forEach(function (e, t) {
                                        l[t].map(function (t) {
                                            b(t, "minduration", e),
                                                b(t, "maxduration", e)
                                        })
                                    })
                                } else
                                    u.map(function (e) {
                                        return b(e, "maxduration", s)
                                    });
                                return u
                            }(n, e)
                                , r = _.tags.filter(function (t) {
                                    return t.uuid !== e.bidId
                                });
                            _.tags = [].concat(o(r), o(t))
                        });
                        var U = w.deepAccess(e[0], "userId.criteoId");
                        if (U) {
                            var M = [];
                            M.push({
                                provider: "criteo",
                                user_id: U
                            }),
                                _.tpuids = M
                        }
                        var q = []
                            , z = w.deepAccess(e[0], "userId.tdid");
                        return z && q.push({
                            source: "adserver.org",
                            id: z,
                            rti_partner: "TDID"
                        }),
                            q.length && (_.eids = q),
                            n[0].publisher_id && (_.publisher_id = n[0].publisher_id),
                            function (e, t) {
                                var n = []
                                    , r = {};
                                if (!function (e) {
                                    var t = !0;
                                    return e && e.gdprConsent && e.gdprConsent.gdprApplies && 2 === e.gdprConsent.apiVersion && (t = !(!0 !== w.deepAccess(e.gdprConsent, "vendorData.purpose.consents.1"))),
                                        t
                                }(t) && (r = {
                                    withCredentials: !1
                                }),
                                    15 < e.tags.length) {
                                    var i = w.deepClone(e);
                                    w.chunk(e.tags, 15).forEach(function (e) {
                                        i.tags = e;
                                        var o = JSON.stringify(i);
                                        n.push({
                                            method: "POST",
                                            url: N,
                                            data: o,
                                            bidderRequest: t,
                                            options: r
                                        })
                                    })
                                } else {
                                    var o = JSON.stringify(e);
                                    n = {
                                        method: "POST",
                                        url: N,
                                        data: o,
                                        bidderRequest: t,
                                        options: r
                                    }
                                }
                                return n
                            }(_, t)
                    },
                    interpretResponse: function (e, t) {
                        var n = this
                            , r = t.bidderRequest;
                        e = e.body;
                        var o = [];
                        if (!e || e.error) {
                            var a = "in response for ".concat(r.bidderCode, " adapter");
                            return e && e.error && (a += ": ".concat(e.error)),
                                w.logError(a),
                                o
                        }
                        if (e.tags && e.tags.forEach(function (e) {
                            var t, a, s = (t = e) && t.ads && t.ads.length && A()(t.ads, function (e) {
                                return e.rtb
                            });
                            if (s && 0 !== s.cpm && j()(n.supportedMediaTypes, s.ad_type)) {
                                var c = function (e, t, n) {
                                    var r = w.getBidRequest(e.uuid, [n])
                                        , o = {
                                            requestId: e.uuid,
                                            cpm: t.cpm,
                                            creativeId: t.creative_id,
                                            dealId: t.deal_id,
                                            currency: "USD",
                                            netRevenue: !0,
                                            ttl: 300,
                                            adUnitCode: r.adUnitCode,
                                            appnexus: {
                                                buyerMemberId: t.buyer_member_id,
                                                dealPriority: t.deal_priority,
                                                dealCode: t.deal_code
                                            }
                                        };
                                    if (t.advertiser_id && (o.meta = i({}, o.meta, {
                                        advertiserId: t.advertiser_id
                                    })),
                                        t.rtb.video)
                                        switch (i(o, {
                                            width: t.rtb.video.player_width,
                                            height: t.rtb.video.player_height,
                                            vastImpUrl: t.notify_url,
                                            ttl: 3600
                                        }),
                                        w.deepAccess(r, "mediaTypes.video.context")) {
                                            case x.a:
                                                var a = Object(T.getIabSubCategory)(r.bidder, t.brand_category_id);
                                                o.meta = i({}, o.meta, {
                                                    primaryCatId: a
                                                });
                                                var s = t.deal_priority;
                                                o.video = {
                                                    context: x.a,
                                                    durationSeconds: Math.floor(t.rtb.video.duration_ms / 1e3),
                                                    dealTier: s
                                                },
                                                    o.vastUrl = t.rtb.video.asset_url;
                                                break;
                                            case k.b:
                                                if (o.adResponse = e,
                                                    o.adResponse.ad = o.adResponse.ads[0],
                                                    o.adResponse.ad.video = o.adResponse.ad.rtb.video,
                                                    o.vastXml = t.rtb.video.content,
                                                    t.renderer_url) {
                                                    var c = A()(n.bids, function (t) {
                                                        return t.bidId === e.uuid
                                                    })
                                                        , u = w.deepAccess(c, "renderer.options");
                                                    o.renderer = function (e, t) {
                                                        var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
                                                            , r = S.a.install({
                                                                id: t.renderer_id,
                                                                url: t.renderer_url,
                                                                config: n,
                                                                loaded: !1,
                                                                adUnitCode: e
                                                            });
                                                        try {
                                                            r.setRender(y)
                                                        } catch (e) {
                                                            w.logWarn("Prebid Error calling setRender on renderer", e)
                                                        }
                                                        return r.setEventHandlers({
                                                            impression: function () {
                                                                return w.logMessage("AppNexus outstream video impression event")
                                                            },
                                                            loaded: function () {
                                                                return w.logMessage("AppNexus outstream video loaded event")
                                                            },
                                                            ended: function () {
                                                                w.logMessage("AppNexus outstream renderer video event"),
                                                                    document.querySelector("#".concat(e)).style.display = "none"
                                                            }
                                                        }),
                                                            r
                                                    }(o.adUnitCode, t, u)
                                                }
                                                break;
                                            case k.a:
                                                o.vastUrl = t.notify_url + "&redir=" + encodeURIComponent(t.rtb.video.asset_url)
                                        }
                                    else if (t.rtb[x.c]) {
                                        var d = t.rtb[x.c]
                                            , l = t.viewability.config.replace("src=", "data-src=")
                                            , f = d.javascript_trackers;
                                        null == f ? f = l : w.isStr(f) ? f = [f, l] : f.push(l),
                                            o[x.c] = {
                                                title: d.title,
                                                body: d.desc,
                                                body2: d.desc2,
                                                cta: d.ctatext,
                                                rating: d.rating,
                                                sponsoredBy: d.sponsored,
                                                privacyLink: d.privacy_link,
                                                address: d.address,
                                                downloads: d.downloads,
                                                likes: d.likes,
                                                phone: d.phone,
                                                price: d.price,
                                                salePrice: d.saleprice,
                                                clickUrl: d.link.url,
                                                displayUrl: d.displayurl,
                                                clickTrackers: d.link.click_trackers,
                                                impressionTrackers: d.impression_trackers,
                                                javascriptTrackers: f
                                            },
                                            d.main_img && (o.native.image = {
                                                url: d.main_img.url,
                                                height: d.main_img.height,
                                                width: d.main_img.width
                                            }),
                                            d.icon && (o.native.icon = {
                                                url: d.icon.url,
                                                height: d.icon.height,
                                                width: d.icon.width
                                            })
                                    } else {
                                        i(o, {
                                            width: t.rtb.banner.width,
                                            height: t.rtb.banner.height,
                                            ad: t.rtb.banner.content
                                        });
                                        try {
                                            if (t.rtb.trackers) {
                                                var p = t.rtb.trackers[0].impression_urls[0]
                                                    , h = w.createTrackPixelHtml(p);
                                                o.ad += h
                                            }
                                        } catch (e) {
                                            w.logError("Error appending tracking pixel", e)
                                        }
                                    }
                                    return o
                                }(e, s, r);
                                c.mediaType = (a = s.ad_type) === x.d ? x.d : a === x.c ? x.c : x.b,
                                    o.push(c)
                            }
                        }),
                            e.debug && e.debug.debug_info) {
                            var s = "AppNexus Debug Auction for Prebid\n\n" + e.debug.debug_info;
                            s = s.replace(/(<td>|<th>)/gm, "\t").replace(/(<\/td>|<\/th>)/gm, "\n").replace(/^<br>/gm, "").replace(/(<br>\n|<br>)/gm, "\n").replace(/<h1>(.*)<\/h1>/gm, "\n\n===== $1 =====\n\n").replace(/<h[2-6]>(.*)<\/h[2-6]>/gm, "\n\n*** $1 ***\n\n").replace(/(<([^>]+)>)/gim, ""),
                                w.logMessage("https://console.appnexus.com/docs/understanding-the-debug-auction"),
                                w.logMessage(s)
                        }
                        return o
                    },
                    getMappingFileInfo: function () {
                        return {
                            url: "https://acdn.adnxs.com/prebid/appnexus-mapping/mappings.json",
                            refreshInDays: 2
                        }
                    },
                    getUserSyncs: function (e) {
                        if (e.iframeEnabled)
                            return [{
                                type: "iframe",
                                url: "https://acdn.adnxs.com/dmp/async_usersync.html"
                            }]
                    },
                    transformBidParams: function (e, t) {
                        return e = w.convertTypes({
                            member: "string",
                            invCode: "string",
                            placementId: "number",
                            keywords: w.transformBidderParamKeywords,
                            publisherId: "number"
                        }, e),
                            t && (e.use_pmt_rule = "boolean" == typeof e.usePaymentRule && e.usePaymentRule,
                                e.usePaymentRule && delete e.usePaymentRule,
                                a(e.keywords) && e.keywords.forEach(s),
                                Object.keys(e).forEach(function (t) {
                                    var n = w.convertCamelToUnderscore(t);
                                    n !== t && (e[n] = e[t],
                                        delete e[t])
                                })),
                            e
                    },
                    onBidWon: function (e) {
                        e.native && function (e) {
                            var t = function (e) {
                                var t;
                                if (w.isStr(e) && c(e))
                                    t = e;
                                else if (w.isArray(e))
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        c(r) && (t = r)
                                    }
                                return t
                            }(e.native.javascriptTrackers);
                            if (t)
                                for (var n = "pbjs_adid=" + e.adId + ";pbjs_auc=" + e.adUnitCode, r = function (e) {
                                    var t = e.indexOf('src="') + 5
                                        , n = e.indexOf('"', t);
                                    return e.substring(t, n)
                                }(t), i = r.replace("dom_id=%native_dom_id%", n), o = document.getElementsByTagName("iframe"), a = !1, s = 0; s < o.length && !a; s++) {
                                    var u = o[s];
                                    try {
                                        var d = u.contentDocument || u.contentWindow.document;
                                        if (d)
                                            for (var l = d.getElementsByTagName("script"), f = 0; f < l.length && !a; f++) {
                                                var p = l[f];
                                                p.getAttribute("data-src") == r && (p.setAttribute("src", i),
                                                    p.setAttribute("data-src", ""),
                                                    p.removeAttribute && p.removeAttribute("data-src"),
                                                    a = !0)
                                            }
                                    } catch (e) {
                                        if (!(e instanceof DOMException && "SecurityError" === e.name))
                                            throw e
                                    }
                                }
                        }(e)
                    }
                };
            Object(T.registerBidder)(H)
        }
    }, [271]),
    pbjsChunk([276], {
        351: function (e, t, n) {
            e.exports = n(352)
        },
        352: function (e, t, n) {
            "use strict";
            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                )(e)
            }
            function i(e, t) {
                var n = {
                    context: this,
                    args: [t],
                    nextFn: e,
                    adUnits: t.adUnits || pbjs.adUnits,
                    bidsBackHandler: t.bidsBackHandler,
                    haveExited: !1,
                    timer: null
                };
                return h ? (g.logInfo("User consent information already known.  Pulling internally stored information..."),
                    c(null, n)) : y()(Object.keys(O), d) ? (O[d].call(this, o, a, n),
                        void (n.haveExited || (0 === l ? o(void 0, n) : n.timer = setTimeout(function (e) {
                            a("CMP workflow exceeded timeout threshold.", e)
                        }
                            .bind(null, n), l)))) : (g.logWarn("CMP framework (".concat(d, ") is not a supported framework.  Aborting consentManagement module and resuming auction.")),
                                n.nextFn.apply(n.context, n.args))
            }
            function o(e, t) {
                "static" === d && 2 === (I = e.getConsentData ? 1 : e.getTCData ? 2 : 0) && (e = e.getTCData);
                var n = 1 === I ? function (e) {
                    var t = e && e.getConsentData && e.getConsentData.gdprApplies;
                    return !("boolean" == typeof t && (!0 !== t || g.isStr(e.getConsentData.consentData) && g.isPlainObject(e.getVendorConsents) && 1 < Object.keys(e.getVendorConsents).length))
                }
                    : 2 === I ? function () {
                        var t = e && "boolean" == typeof e.gdprApplies ? e.gdprApplies : f
                            , n = e && e.tcString;
                        return !("boolean" == typeof t && (!0 !== t || g.isStr(n)))
                    }
                        : null;
                E.definedInConfig && 2 === I ? g.logWarn("'allowAuctionWithoutConsent' ignored for TCF 2") : E.definedInConfig || 1 !== I || g.logInfo("'allowAuctionWithoutConsent' using system default: (".concat(x, ").")),
                    g.isFn(n) ? n(e) ? a("CMP returned unexpected value during lookup process.", t, e) : (clearTimeout(t.timer),
                        s(e),
                        c(null, t)) : a("Unable to derive CMP version to process data.  Consent object does not conform to TCF v1 or v2 specs.", t, e)
            }
            function a(e, t, n) {
                clearTimeout(t.timer),
                    E.value && 1 === I && s(void 0),
                    c(e, t, n)
            }
            function s(e) {
                1 === I ? h = {
                    consentString: e ? e.getConsentData.consentData : void 0,
                    vendorData: e ? e.getVendorConsents : void 0,
                    gdprApplies: e ? e.getConsentData.gdprApplies : f
                } : (h = {
                    consentString: e ? e.tcString : void 0,
                    vendorData: e || void 0,
                    gdprApplies: e && "boolean" == typeof e.gdprApplies ? e.gdprApplies : f
                },
                    e && e.addtlConsent && g.isStr(e.addtlConsent) && (h.addtlConsent = e.addtlConsent)),
                    h.apiVersion = I,
                    v.gdprDataHandler.setConsentData(h)
            }
            function c(e, t, n) {
                if (!1 === t.haveExited) {
                    t.haveExited = !0;
                    var r = t.context
                        , i = t.args
                        , o = t.nextFn;
                    e ? E.value && 1 === I ? (g.logWarn(e + " 'allowAuctionWithoutConsent' activated.", n),
                        o.apply(r, i)) : (g.logError(e + " Canceling auction as per consentManagement config.", n),
                            "function" == typeof t.bidsBackHandler ? t.bidsBackHandler() : g.logError("Error executing bidsBackHandler")) : o.apply(r, i)
                }
            }
            function u(e) {
                (e = e && (e.gdpr || e.usp ? e.gdpr : e)) && "object" === r(e) ? (g.isStr(e.cmpApi) ? d = e.cmpApi : (d = C,
                    g.logInfo("consentManagement config did not specify cmp.  Using system default setting (".concat(C, ")."))),
                    g.isNumber(e.timeout) ? l = e.timeout : (l = T,
                        g.logInfo("consentManagement config did not specify timeout.  Using system default setting (".concat(T, ")."))),
                    "boolean" == typeof e.allowAuctionWithoutConsent && (E.value = e.allowAuctionWithoutConsent,
                        E.definedInConfig = !0),
                    f = !0 === e.defaultGdprScope,
                    g.logInfo("consentManagement module has been activated..."),
                    "static" === d && (g.isPlainObject(e.consentData) ? (p = e.consentData,
                        l = 0) : g.logError("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.")),
                    A || pbjs.requestBids.before(i, 50),
                    A = !0) : g.logWarn("consentManagement config not defined, exiting consent manager")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "allowAuction", function () {
                    return E
                }),
                n.d(t, "userCMP", function () {
                    return d
                }),
                n.d(t, "consentTimeout", function () {
                    return l
                }),
                n.d(t, "gdprScope", function () {
                    return f
                }),
                n.d(t, "staticConsentData", function () {
                    return p
                }),
                t.requestBidsHook = i,
                t.resetConsentData = function () {
                    h = void 0,
                        d = void 0,
                        I = 0,
                        v.gdprDataHandler.setConsentData(null)
                }
                ,
                t.setConsentConfig = u;
            var d, l, f, p, h, g = n(0), m = n(3), v = n(9), b = n(12), y = n.n(b), S = n(353), w = n.n(S), C = "iab", T = 1e4, x = !0, E = {
                value: x,
                definedInConfig: !1
            }, I = 0, A = !1, O = {
                iab: function (e, t, n) {
                    function r(r, i) {
                        g.logInfo("Received a response from CMP", r),
                            i ? !1 !== r.gdprApplies && "tcloaded" !== r.eventStatus && "useractioncomplete" !== r.eventStatus || e(r, n) : t("CMP unable to register callback function.  Please check CMP setup.", n)
                    }
                    function i(e, t) {
                        var r = n.adUnits
                            , i = 1
                            , o = 1;
                        if (Array.isArray(r) && 0 < r.length) {
                            var a = g.getAdUnitSizes(r[0]);
                            i = a[0][0],
                                o = a[0][1]
                        }
                        window.$sf.ext.register(i, o, function (n, r) {
                            if ("cmpReturn" === n) {
                                var i = "getConsentData" === e ? r.vendorConsentData : r.vendorConsents;
                                t(i)
                            }
                        }),
                            window.$sf.ext.cmp(e)
                    }
                    function o(e, t, n) {
                        var r = 2 === I ? "__tcfapi" : "__cmp";
                        window[r] = function (e, n, i) {
                            var o, a, c, u = Math.random() + "", d = "".concat(r, "Call"), l = (c = {
                                command: e,
                                parameter: n,
                                callId: u
                            },
                                (a = d) in (o = {}) ? Object.defineProperty(o, a, {
                                    value: c,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : o[a] = c,
                                o);
                            1 !== I && (l[d].version = I),
                                s[u] = i,
                                t.postMessage(l, "*")
                        }
                            ,
                            window.addEventListener("message", function (e) {
                                var t = "".concat(r, "Return")
                                    , n = "string" == typeof e.data && w()(e.data, t) ? JSON.parse(e.data) : e.data;
                                if (n[t] && n[t].callId) {
                                    var i = n[t];
                                    void 0 !== s[i.callId] && s[i.callId](i.returnValue, i.success)
                                }
                            }, !1),
                            window[r](e, void 0, n)
                    }
                    var a = function () {
                        function t() {
                            r.getConsentData && r.getVendorConsents && (g.logInfo("Received all requested responses from CMP", r),
                                e(r, n))
                        }
                        var r = {};
                        return {
                            consentDataCallback: function (e) {
                                r.getConsentData = e,
                                    t()
                            },
                            vendorConsentsCallback: function (e) {
                                r.getVendorConsents = e,
                                    t()
                            }
                        }
                    }()
                        , s = {}
                        , c = function () {
                            for (var e, t, n = window; !e;) {
                                try {
                                    if ("function" == typeof n.__tcfapi || "function" == typeof n.__cmp) {
                                        t = "function" == typeof n.__tcfapi ? (I = 2,
                                            n.__tcfapi) : (I = 1,
                                                n.__cmp),
                                            e = n;
                                        break
                                    }
                                } catch (e) { }
                                try {
                                    if (n.frames.__tcfapiLocator) {
                                        I = 2,
                                            e = n;
                                        break
                                    }
                                } catch (e) { }
                                try {
                                    if (n.frames.__cmpLocator) {
                                        I = 1,
                                            e = n;
                                        break
                                    }
                                } catch (e) { }
                                if (n === window.top)
                                    break;
                                n = n.parent
                            }
                            return {
                                cmpFrame: e,
                                cmpFunction: t
                            }
                        }()
                        , u = c.cmpFrame
                        , d = c.cmpFunction;
                    return u ? void (g.isFn(d) ? (g.logInfo("Detected CMP API is directly accessible, calling it now..."),
                        1 === I ? (d("getConsentData", null, a.consentDataCallback),
                            d("getVendorConsents", null, a.vendorConsentsCallback)) : 2 === I && d("addEventListener", I, r)) : 1 === I && window.$sf && window.$sf.ext && "function" == typeof window.$sf.ext.cmp ? (g.logInfo("Detected Prebid.js is encased in a SafeFrame and CMP is registered, calling it now..."),
                                i("getConsentData", a.consentDataCallback),
                                i("getVendorConsents", a.vendorConsentsCallback)) : (g.logInfo("Detected CMP is outside the current iframe where Prebid.js is located, calling it now..."),
                                    1 === I ? (o("getConsentData", u, a.consentDataCallback),
                                        o("getVendorConsents", u, a.vendorConsentsCallback)) : 2 === I && o("addEventListener", u, r))) : t("CMP not found.", n)
                },
                static: function (e, t, n) {
                    e(p, n)
                }
            };
            m.b.getConfig("consentManagement", function (e) {
                return u(e.consentManagement)
            })
        }
    }, [351]),
    pbjsChunk([275], {
        359: function (e, t, n) {
            e.exports = n(360)
        },
        360: function (e, t, n) {
            "use strict";
            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                )(e)
            }
            function i(e, t) {
                var n = {
                    context: this,
                    args: [t],
                    nextFn: e,
                    adUnits: t.adUnits || pbjs.adUnits,
                    bidsBackHandler: t.bidsBackHandler,
                    haveExited: !1,
                    timer: null
                };
                return y[u] ? (y[u].call(this, o, a, n),
                    void (n.haveExited || (0 === d ? o(void 0, n) : n.timer = setTimeout(function (e) {
                        a("USPAPI workflow exceeded timeout threshold.", e)
                    }
                        .bind(null, n), d)))) : (p.logWarn("USP framework (".concat(u, ") is not a supported framework. Aborting consentManagement module and resuming auction.")),
                            n.nextFn.apply(n.context, n.args))
            }
            function o(e, t) {
                var n;
                e && e.usPrivacy ? (clearTimeout(t.timer),
                    (n = e) && n.usPrivacy && (f = n.usPrivacy,
                        g.uspDataHandler.setConsentData(f)),
                    s(null, t)) : a("USPAPI returned unexpected value during lookup process.", t, e)
            }
            function a(e, t, n) {
                clearTimeout(t.timer),
                    s(e, t, n)
            }
            function s(e, t, n) {
                if (!1 === t.haveExited) {
                    t.haveExited = !0;
                    var r = t.context
                        , i = t.args
                        , o = t.nextFn;
                    e && p.logWarn(e + " Resuming auction without consent data as per consentManagement config.", n),
                        o.apply(r, i)
                }
            }
            function c(e) {
                (e = e && e.usp) && "object" === r(e) ? (p.isStr(e.cmpApi) ? u = e.cmpApi : (u = m,
                    p.logInfo("consentManagement.usp config did not specify cmpApi. Using system default setting (".concat(m, ")."))),
                    p.isNumber(e.timeout) ? d = e.timeout : (d = v,
                        p.logInfo("consentManagement.usp config did not specify timeout. Using system default setting (".concat(v, ")."))),
                    p.logInfo("USPAPI consentManagement module has been activated..."),
                    "static" === u && (p.isPlainObject(e.consentData) && p.isPlainObject(e.consentData.getUSPData) ? (e.consentData.getUSPData.uspString && (l = {
                        usPrivacy: e.consentData.getUSPData.uspString
                    }),
                        d = 0) : p.logError("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.")),
                    b || pbjs.requestBids.before(i, 50),
                    b = !0) : p.logWarn("consentManagement.usp config not defined, exiting usp consent manager")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "consentAPI", function () {
                    return u
                }),
                n.d(t, "consentTimeout", function () {
                    return d
                }),
                n.d(t, "staticConsentData", function () {
                    return l
                }),
                t.requestBidsHook = i,
                t.resetConsentData = function () {
                    f = void 0,
                        u = void 0,
                        g.uspDataHandler.setConsentData(null)
                }
                ,
                t.setConsentConfig = c;
            var u, d, l, f, p = n(0), h = n(3), g = n(9), m = "iab", v = 50, b = !1, y = {
                iab: function (e, t, n) {
                    var r = function () {
                        var r = {};
                        return {
                            consentDataCallback: function (i, o) {
                                o && i.uspString && (r.usPrivacy = i.uspString),
                                    r.usPrivacy ? e(r, n) : t("Unable to get USP consent string.", n)
                            }
                        }
                    }()
                        , i = {};
                    try {
                        window.__uspapi("getUSPData", 1, r.consentDataCallback)
                    } catch (e) {
                        for (var o, a = window; !o;) {
                            try {
                                a.frames.__uspapiLocator && (o = a)
                            } catch (e) { }
                            if (a === window.top)
                                break;
                            a = a.parent
                        }
                        if (!o)
                            return t("USP CMP not found.", n);
                        !function (e, t, n) {
                            function r(e) {
                                var t = e && e.data && e.data.__uspapiReturn;
                                t && t.callId && void 0 !== i[t.callId] && (i[t.callId](t.returnValue, t.success),
                                    delete i[t.callId])
                            }
                            window.__uspapi = function (e, n, r) {
                                var o = Math.random() + ""
                                    , a = {
                                        __uspapiCall: {
                                            command: e,
                                            version: n,
                                            callId: o
                                        }
                                    };
                                i[o] = r,
                                    t.postMessage(a, "*")
                            }
                                ,
                                window.addEventListener("message", r, !1),
                                window.__uspapi(e, 1, function (e, t) {
                                    window.removeEventListener("message", r, !1),
                                        n(e, t)
                                })
                        }("getUSPData", o, r.consentDataCallback)
                    }
                },
                static: function (e, t, n) {
                    e(l, n)
                }
            };
            h.b.getConfig("consentManagement", function (e) {
                return c(e.consentManagement)
            })
        }
    }, [359]),
    pbjsChunk([272], {
        365: function (e, t, n) {
            e.exports = n(366)
        },
        366: function (e, t, n) {
            "use strict";
            function r(e) {
                var t;
                return Array.isArray(e) && (t = 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1] ? [{
                    w: e[0],
                    h: e[1]
                }] : a._map(e, function (e) {
                    return {
                        w: e[0],
                        h: e[1]
                    }
                })),
                    t
            }
            function i(e) {
                return "video" === e.mediaType || a.deepAccess(e, "mediaTypes.video")
            }
            function o(e, t, n) {
                e && (t[n] = e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "storage", function () {
                    return d
                }),
                n.d(t, "spec", function () {
                    return f
                });
            var a = n(0)
                , s = n(1)
                , c = n(2)
                , u = n(7)
                , d = Object(u.b)(24)
                , l = "conversant"
                , f = {
                    code: l,
                    gvlid: 24,
                    aliases: ["cnvr"],
                    supportedMediaTypes: [c.b, c.d],
                    isBidRequestValid: function (e) {
                        if (!e || !e.params)
                            return a.logWarn(l + ": Missing bid parameters"),
                                !1;
                        if (!a.isStr(e.params.site_id))
                            return a.logWarn(l + ": site_id must be specified as a string"),
                                !1;
                        if (i(e))
                            if (e.params.mimes) {
                                if (!a.isArray(e.params.mimes) || !e.params.mimes.every(function (e) {
                                    return a.isStr(e)
                                }))
                                    return a.logWarn(l + ": mimes must be an array of strings"),
                                        !1
                            } else
                                a.logWarn(l + ": mimes should be specified for videos");
                        return !0
                    },
                    buildRequests: function (e, t) {
                        var n, s = t && t.refererInfo ? t.refererInfo.referer : "", c = "", u = "", l = null, f = "_pubcid", p = "https://web.hb.ad.cpe.dotomi.com/cvx/client/hb/ortb/25", h = e.map(function (e) {
                            var t = a.getBidIdParameter("bidfloor", e.params);
                            c = a.getBidIdParameter("site_id", e.params) || c,
                                f = a.getBidIdParameter("pubcid_name", e.params) || f,
                                u = e.auctionId;
                            var n = {
                                id: e.bidId,
                                secure: 1,
                                bidfloor: t || 0,
                                displaymanager: "Prebid.js",
                                displaymanagerver: "4.14.0"
                            };
                            if (o(e.params.tag_id, n, "tagid"),
                                i(e)) {
                                var s = a.deepAccess(e, "mediaTypes.video") || {}
                                    , d = r(s.playerSize || e.sizes)
                                    , h = {};
                                d && d[0] && (o(d[0].w, h, "w"),
                                    o(d[0].h, h, "h")),
                                    o(e.params.position, h, "pos"),
                                    o(e.params.mimes || s.mimes, h, "mimes"),
                                    o(e.params.maxduration, h, "maxduration"),
                                    o(e.params.protocols || s.protocols, h, "protocols"),
                                    o(e.params.api || s.api, h, "api"),
                                    n.video = h
                            } else {
                                var g = {
                                    format: r((a.deepAccess(e, "mediaTypes.banner") || {}).sizes || e.sizes)
                                };
                                o(e.params.position, g, "pos"),
                                    n.banner = g
                            }
                            return e.userId && e.userId.pubcid ? l = e.userId.pubcid : e.crumbs && e.crumbs.pubcid && (l = e.crumbs.pubcid),
                                e.params.white_label_url && (p = e.params.white_label_url),
                                n
                        }), g = {
                            id: u,
                            imp: h,
                            site: {
                                id: c,
                                mobile: null !== document.querySelector('meta[name="viewport"][content*="width=device-width"]') ? 1 : 0,
                                page: s
                            },
                            device: (n = navigator.language ? "language" : "userLanguage",
                            {
                                h: screen.height,
                                w: screen.width,
                                dnt: "1" === navigator.doNotTrack || "1" === window.doNotTrack || "1" === navigator.msDoNoTrack || "yes" === navigator.doNotTrack ? 1 : 0,
                                language: navigator[n].split("-")[0],
                                make: navigator.vendor ? navigator.vendor : "",
                                ua: navigator.userAgent
                            }),
                            at: 1
                        }, m = {};
                        t && (t.gdprConsent && (m.consent = t.gdprConsent.consentString,
                            "boolean" == typeof t.gdprConsent.gdprApplies && a.deepSetValue(g, "regs.ext.gdpr", t.gdprConsent.gdprApplies ? 1 : 0)),
                            t.uspConsent && a.deepSetValue(g, "regs.ext.us_privacy", t.uspConsent)),
                            (l = l || function (e) {
                                var t;
                                try {
                                    if (!(t = d.getCookie(e))) {
                                        var n = d.getDataFromLocalStorage("".concat(e, "_exp"));
                                        ("" === n || n && 0 < new Date(n).getTime() - Date.now()) && (t = (t = d.getDataFromLocalStorage(e)) ? decodeURIComponent(t) : t)
                                    }
                                    a.isStr(t) && "{" === t.charAt(0) && (t = JSON.parse(t))
                                } catch (e) {
                                    a.logError(e)
                                }
                                return t
                            }(f)) && (m.fpc = l);
                        var v = function (e) {
                            var t = e[0]
                                , n = [];
                            if (a.isArray(t.userIdAsEids) && 0 < t.userIdAsEids.length) {
                                var r = {
                                    "adserver.org": 1,
                                    "liveramp.com": 1,
                                    "criteo.com": 1,
                                    "id5-sync.com": 1,
                                    "parrable.com": 1,
                                    "digitru.st": 1,
                                    "liveintent.com": 1
                                };
                                t.userIdAsEids.forEach(function (e) {
                                    r.hasOwnProperty(e.source) && n.push(e)
                                })
                            }
                            return n
                        }(e);
                        return 0 < v.length && (m.eids = v),
                            a.isEmpty(m) || (g.user = {
                                ext: m
                            }),
                        {
                            method: "POST",
                            url: p,
                            data: g
                        }
                    },
                    interpretResponse: function (e, t) {
                        var n = []
                            , r = {};
                        return e = e.body,
                            t && t.data && t.data.imp && a._each(t.data.imp, function (e) {
                                return r[e.id] = e
                            }),
                            e && a.isArray(e.seatbid) && a._each(e.seatbid, function (t) {
                                a._each(t.bid, function (t) {
                                    var i = parseFloat(t.price);
                                    if (0 < i && t.impid) {
                                        var o = t.adm || ""
                                            , a = t.nurl || ""
                                            , s = r[t.impid]
                                            , c = {
                                                requestId: t.impid,
                                                currency: e.cur || "USD",
                                                cpm: i,
                                                creativeId: t.crid || "",
                                                ttl: 300,
                                                netRevenue: !0
                                            };
                                        s.video ? ("<" === o.charAt(0) ? c.vastXml = o : c.vastUrl = o,
                                            c.mediaType = "video",
                                            c.width = s.video.w,
                                            c.height = s.video.h) : (c.ad = o + '<img src="' + a + '" />',
                                                c.width = t.w,
                                                c.height = t.h),
                                            n.push(c)
                                    }
                                })
                            }),
                            n
                    },
                    transformBidParams: function (e) {
                        return a.convertTypes({
                            site_id: "string",
                            secure: "number",
                            mobile: "number"
                        }, e)
                    }
                };
            Object(s.registerBidder)(f)
        }
    }, [365]),
    pbjsChunk([268], {
        378: function (e, t, n) {
            e.exports = n(379)
        },
        379: function (e, t, n) {
            "use strict";
            function r(e, t) {
                var n = 1 < arguments.length && void 0 !== t && t
                    , r = s.parseUrl(e, {
                        noDecodeWholeURL: !0
                    });
                return n ? "".concat(r.hostname) : "".concat(r.protocol, "://").concat(r.hostname).concat(r.port ? ":" + r.port : "", "/")
            }
            function i(e) {
                return p.getCookie(e) || p.getDataFromLocalStorage(e)
            }
            function o(e, t) {
                e && t && (p.setCookie(e, t, b),
                    p.setDataInLocalStorage(e, t))
            }
            function a(e, t) {
                var n, i, a, d, l, f, b = function () {
                    p.setCookie(m, "1");
                    var e = "1" === p.getCookie(m);
                    return p.setCookie(m, "", v),
                        e
                }(), y = r(Object(u.a)().referer), S = r(document.location.href, !0), w = "undefined" != typeof criteo_pubtag, C = (n = y,
                    i = S,
                    a = e.bundle,
                    d = b,
                    l = w,
                    f = t,
                    "https://gum.criteo.com/sid/json?origin=prebid" + "".concat(n ? "&topUrl=" + encodeURIComponent(n) : "") + "".concat(i ? "&domain=" + encodeURIComponent(i) : "") + "".concat(a ? "&bundle=" + encodeURIComponent(a) : "") + "".concat(f ? "&gdprString=" + encodeURIComponent(f) : "") + "".concat(d ? "&cw=1" : "") + "".concat(l ? "&pbt=1" : ""));
                c.b()(C, function (e) {
                    var t, n = JSON.parse(e);
                    n.bidId ? o(h, n.bidId) : (t = h,
                        p.setCookie(t, "", v),
                        p.removeDataFromLocalStorage(t)),
                        n.acwsUrl ? ("string" == typeof n.acwsUrl ? [n.acwsUrl] : n.acwsUrl).forEach(function (e) {
                            return s.triggerPixel(e)
                        }) : n.bundle && o(g, n.bundle)
                }, void 0, {
                    method: "GET",
                    contentType: "application/json",
                    withCredentials: !0
                })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "storage", function () {
                    return p
                }),
                n.d(t, "criteoIdSubmodule", function () {
                    return y
                });
            var s = n(0)
                , c = n(4)
                , u = n(20)
                , d = n(13)
                , l = n(7)
                , f = "criteo"
                , p = Object(l.b)(91, f)
                , h = "cto_bidid"
                , g = "cto_bundle"
                , m = "cto_test_cookie"
                , v = new Date(0).toString()
                , b = new Date(s.timestamp() + 33696e6).toString()
                , y = {
                    name: f,
                    gvlid: 91,
                    decode: function (e) {
                        return e
                    },
                    getId: function (e, t) {
                        var n = t && "boolean" == typeof t.gdprApplies && t.gdprApplies ? t.consentString : void 0
                            , r = {
                                bundle: i(g),
                                bidId: i(h)
                            };
                        return a(r, n),
                        {
                            id: r.bidId ? {
                                criteoId: r.bidId
                            } : void 0
                        }
                    }
                };
            Object(d.e)("userId", y)
        }
    }, [378]),
    pbjsChunk([252], {
        414: function (e, t, n) {
            e.exports = n(415)
        },
        415: function (e, t, n) {
            "use strict";
            function r(e) {
                return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                )(e)
            }
            function i(e, t) {
                return e.sizes && e.sizes.length ? s.parseSizesInput(t ? e.sizes[0] : e.sizes).join(",") : h
            }
            function o(e) {
                var t;
                (t = {
                    name: e.id,
                    div: e
                }).div && (a(g + t.name),
                    function () {
                        function e(e, t, n) {
                            var r, i = 0;
                            return r = n,
                                e < t || r < 0 || (i = t < 0 ? n / (n - t) : n < e ? 1 : (e - t) / (n - t)),
                                i
                        }
                        function t() {
                            return o
                        }
                        function n(n) {
                            var r, i, o = n.getBoundingClientRect();
                            return i = o,
                                e(t().innerHeight, i.top, i.bottom) * (r = o,
                                    e(t().innerWidth, r.left, r.right)) > c
                        }
                        function r(e) {
                            return null != e
                        }
                        function i(e) {
                            return function (e) {
                                try {
                                    o = e && window.document.body.contains(e) ? window : window.top.document.body.contains(e) ? top : void 0
                                } catch (e) { }
                            }(e),
                                function () {
                                    try {
                                        return window === window.top || window.frameElement
                                    } catch (e) { }
                                }() && r(t()) && function () {
                                    try {
                                        return t().top.document.hasFocus()
                                    } catch (e) { }
                                }() && 0 < (s = e).offsetHeight && 0 < s.offsetWidth && (a = e,
                                    "hidden" !== t().getComputedStyle(a).visibility) && function e(t) {
                                        var n = t.style
                                            , r = t.parentNode;
                                        return !(n && 0 === parseFloat(n.opacity)) && (!r || e(r))
                                    }(e) && n(e) && (!r(t().frameElement) || i(t().frameElement));
                            var a, s
                        }
                        var o, a = 5, s = 1e3, c = .5;
                        return {
                            isVisible: i,
                            onView: function e(t, n, r) {
                                var o = i(n) ? t + 1 : 0;
                                o === a ? r() : setTimeout(e.bind(this, o, n, r), s / a)
                            }
                                .bind(this, 0)
                        }
                    }().onView(t.div, a.bind(void 0, m + t.name)))
            }
            function a(e) {
                var t;
                try {
                    t = (t = d.getDataFromLocalStorage(e)) ? window.parseInt(t, 10) + 1 : 1,
                        d.setDataInLocalStorage(e, t)
                } catch (e) {
                    return !1
                }
                return !0
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "storage", function () {
                    return d
                }),
                n.d(t, "spec", function () {
                    return v
                });
            var s = n(0)
                , c = n(1)
                , u = n(7)
                , d = Object(u.b)()
                , l = Math.random()
                , f = "i.e-planning.net"
                , p = ["ci", "sv", "t", "ml"]
                , h = "1x1"
                , g = "pbsr_"
                , m = "pbvi_"
                , v = {
                    code: "eplanning",
                    isBidRequestValid: function (e) {
                        return Boolean(e.params.ci) || Boolean(e.params.t)
                    },
                    buildRequests: function (e, t) {
                        var n, r, a, s, c, u, h, v, b, y = function (e) {
                            if (function (e) {
                                for (var t = 0; t < e.length; t++)
                                    if (e[t].params.t)
                                        return 1
                            }(e))
                                return function (e) {
                                    var t;
                                    return e.forEach(function (e) {
                                        return t = t || e.params.isv
                                    }),
                                    {
                                        t: !0,
                                        isv: t || f
                                    }
                                }(e.filter(function (e) {
                                    return e.params.t
                                }));
                            var t = {};
                            return e.forEach(function (e) {
                                p.forEach(function (n) {
                                    e.params[n] && !t[n] && (t[n] = e.params[n])
                                })
                            }),
                                t
                        }(e), S = function () {
                            try {
                                return window.top.document.charset || window.top.document.characterSet
                            } catch (e) {
                                return document.charset || document.characterSet
                            }
                        }(), w = (a = e,
                            s = y.ml,
                            c = function (e) {
                                var t = {};
                                return e.forEach(function (e) {
                                    var n = i(e, !0);
                                    t[n] = t[n] ? t[n] : [],
                                        t[n].push(e)
                                }),
                                    t
                            }(a),
                            (u = {
                                str: "",
                                vs: "",
                                map: {}
                            }).str = Object.keys(c).map(function (e) {
                                return c[e].map(function (e, t) {
                                    u.vs += function (e) {
                                        var t, n = "";
                                        return d.hasLocalStorage() ? (t = function (e) {
                                            var t = d.getDataFromLocalStorage(g + e.adUnitCode) || 0
                                                , n = d.getDataFromLocalStorage(m + e.adUnitCode) || 0
                                                , r = 0 < t ? n / t : 0;
                                            return {
                                                render: t,
                                                ratio: window.parseInt(10 * r, 10)
                                            }
                                        }(e),
                                            n += 4 <= t.render ? t.ratio.toString(16) : "F") : n += "F",
                                            n
                                    }(e);
                                    var n = s ? e.adUnitCode.replace(/_|\.|-|\//g, "").replace(/\)\(|\(|\)|:/g, "_").replace(/^_+|_+$/g, "") : i(e, !0) + "_" + t;
                                    return u.map[n] = e.bidId,
                                        n + ":" + i(e)
                                }).join("+")
                            }).join("+"),
                            u), C = t.refererInfo.referer;
                        if (y.t)
                            n = "https://" + y.isv + "/layers/t_pbjs_2.json",
                                r = {};
                        else {
                            n = "https://" + (y.sv || "ads.us.e-planning.net") + "/hb/1/" + y.ci + "/1/" + (v = C,
                                (b = document.createElement("a")).href = v,
                                b.hostname) + "/ROS";
                            var T = t.refererInfo.referer.reachedTop ? window.top.document.referrer : t.refererInfo.referer;
                            d.hasLocalStorage() && (h = [],
                                e.forEach(function (e) {
                                    var t = document.getElementById(e.adUnitCode);
                                    t ? o(t) : h.push(e.adUnitCode)
                                }),
                                h.length && function (e) {
                                    var t = new MutationObserver(function (t, n) {
                                        t && Array.isArray(t) && t.forEach(function (t) {
                                            t && t.addedNodes && Array.isArray(t.addedNodes) && t.addedNodes.forEach(function (t) {
                                                var r = e.indexOf(t.id);
                                                0 <= r && (o(t),
                                                    e.splice(r, 1),
                                                    e.length || n.disconnect())
                                            })
                                        })
                                    }
                                    );
                                    document.addEventListener("DOMContentLoaded", function (e) {
                                        t.observe(document.body, {
                                            childList: !0,
                                            subtree: !0,
                                            characterData: !0
                                        })
                                    })
                                }(h)),
                                r = {
                                    rnd: l,
                                    e: w.str,
                                    ur: C || "file",
                                    r: "pbjs",
                                    pbv: "4.14.0",
                                    ncb: "1",
                                    vs: w.vs
                                },
                                S && (r.crs = S),
                                T && (r.fr = T),
                                t && t.gdprConsent && void 0 !== t.gdprConsent.gdprApplies && (r.gdpr = t.gdprConsent.gdprApplies ? "1" : "0",
                                    void 0 !== t.gdprConsent.consentString && (r.gdprcs = t.gdprConsent.consentString)),
                                t && t.uspConsent && (r.ccpa = t.uspConsent)
                        }
                        return {
                            method: "GET",
                            url: n,
                            data: r,
                            adUnitToBidId: w.map
                        }
                    },
                    interpretResponse: function (e, t) {
                        var n = e.body
                            , r = [];
                        return n && !s.isEmpty(n.sp) && n.sp.forEach(function (e) {
                            s.isEmpty(e.a) || e.a.forEach(function (n) {
                                var i = {
                                    requestId: t.adUnitToBidId[e.k],
                                    cpm: n.pr,
                                    width: n.w,
                                    height: n.h,
                                    ad: n.adm,
                                    ttl: 120,
                                    creativeId: n.crid,
                                    netRevenue: !0,
                                    currency: "USD"
                                };
                                r.push(i)
                            })
                        }),
                            r
                    },
                    getUserSyncs: function (e, t) {
                        var n = []
                            , i = !s.isEmpty(t) && t[0].body;
                        return i && !s.isEmpty(i.cs) && i.cs.forEach(function (t) {
                            "string" == typeof t && e.pixelEnabled ? n.push({
                                type: "image",
                                url: t
                            }) : "object" === r(t) && t.ifr && e.iframeEnabled && n.push({
                                type: "iframe",
                                url: t.u
                            })
                        }),
                            n
                    }
                };
            Object(c.registerBidder)(v)
        }
    }, [414]),
    pbjsChunk([9], {
        6: function (e, t, n) {
            "use strict";
            function r(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                    e
            }
            function i(e) {
                return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }
                )(e)
            }
            t.a = function (e) {
                function t(e) {
                    var t = e.eventType
                        , n = e.args
                        , r = this;
                    A && window[A] && t && n ? this.track({
                        eventType: t,
                        args: n
                    }) : j.push(function () {
                        k++,
                            r.track({
                                eventType: t,
                                args: n
                            })
                    })
                }
                function n(e) {
                    var n, a = this, s = this;
                    "object" !== i(e) || "object" !== i(e.options) || void 0 === e.options.sampling || Math.random() < parseFloat(e.options.sampling) ? (c.getEvents().forEach(function (e) {
                        if (e) {
                            var n = e.eventType
                                , r = e.args;
                            n !== g && t.call(s, {
                                eventType: n,
                                args: r
                            })
                        }
                    }),
                        r(n = {}, p, function (e) {
                            return a.enqueue({
                                eventType: p,
                                args: e
                            })
                        }),
                        r(n, h, function (e) {
                            return a.enqueue({
                                eventType: h,
                                args: e
                            })
                        }),
                        r(n, m, function (e) {
                            return a.enqueue({
                                eventType: m,
                                args: e
                            })
                        }),
                        r(n, v, function (e) {
                            return a.enqueue({
                                eventType: v,
                                args: e
                            })
                        }),
                        r(n, g, function (e) {
                            return a.enqueue({
                                eventType: g,
                                args: e
                            })
                        }),
                        r(n, b, function (e) {
                            return a.enqueue({
                                eventType: b,
                                args: e
                            })
                        }),
                        r(n, y, function (e) {
                            return a.enqueue({
                                eventType: y,
                                args: e
                            })
                        }),
                        r(n, S, function (e) {
                            return a.enqueue({
                                eventType: S,
                                args: e
                            })
                        }),
                        r(n, w, function (e) {
                            return a.enqueue({
                                eventType: w,
                                args: e
                            })
                        }),
                        r(n, f, function (e) {
                            return a.enqueue({
                                eventType: f,
                                args: e
                            })
                        }),
                        r(n, C, function (e) {
                            return a.enqueue({
                                eventType: C,
                                args: e
                            })
                        }),
                        r(n, T, function (e) {
                            return a.enqueue({
                                eventType: T,
                                args: e
                            })
                        }),
                        r(n, x, function (e) {
                            return a.enqueue({
                                eventType: x,
                                args: e
                            })
                        }),
                        r(n, l, function (t) {
                            t.config = "object" === i(e) && e.options || {},
                                a.enqueue({
                                    eventType: l,
                                    args: t
                                })
                        }),
                        o = n,
                        u._each(o, function (e, t) {
                            c.on(t, e)
                        })) : u.logMessage('Analytics adapter for "'.concat(A, '" disabled by sampling')),
                        this._oldEnable = this.enableAnalytics,
                        this.enableAnalytics = function () {
                            return u.logMessage('Analytics adapter for "'.concat(A, '" already enabled, unnecessary call to `enableAnalytics`.'))
                        }
                }
                var o, a = e.url, d = e.analyticsType, A = e.global, O = e.handler, j = [], k = 0, _ = !0;
                return d !== E && !I || function () {
                    if (_) {
                        for (var e = 0; e < j.length; e++)
                            j[e]();
                        j.push = function (e) {
                            e()
                        }
                            ,
                            _ = !1
                    }
                    u.logMessage("event count sent to ".concat(A, ": ").concat(k))
                }(),
                {
                    track: function (e) {
                        var t = e.eventType
                            , n = e.args;
                        this.getAdapterType() === I && window[A](O, t, n),
                            this.getAdapterType() === E && function (e) {
                                var t = e.eventType
                                    , n = e.args
                                    , r = e.callback;
                                Object(s.a)(a, r, JSON.stringify({
                                    eventType: t,
                                    args: n
                                }))
                            }
                                .apply(void 0, arguments)
                    },
                    enqueue: t,
                    enableAnalytics: n,
                    disableAnalytics: function () {
                        u._each(o, function (e, t) {
                            c.off(t, e)
                        }),
                            this.enableAnalytics = this._oldEnable ? this._oldEnable : n
                    },
                    getAdapterType: function () {
                        return d
                    },
                    getGlobal: function () {
                        return A
                    },
                    getHandler: function () {
                        return O
                    },
                    getUrl: function () {
                        return a
                    }
                }
            }
                ;
            var o = n(5)
                , a = n.n(o)
                , s = n(4)
                , c = n(8)
                , u = n(0)
                , d = a.a.EVENTS
                , l = d.AUCTION_INIT
                , f = d.AUCTION_END
                , p = d.REQUEST_BIDS
                , h = d.BID_REQUESTED
                , g = d.BID_TIMEOUT
                , m = d.BID_RESPONSE
                , v = d.NO_BID
                , b = d.BID_WON
                , y = d.BID_ADJUSTMENT
                , S = d.BIDDER_DONE
                , w = d.SET_TARGETING
                , C = d.AD_RENDER_FAILED
                , T = d.AUCTION_DEBUG
                , x = d.ADD_AD_UNITS
                , E = "endpoint"
                , I = "bundle"
        },
        774: function (e, t, n) {
            e.exports = n(775)
        },
        775: function (e, t, n) {
            "use strict";
            function r(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function i(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(e, r.key, r)
                }
            }
            function o(e, t, n) {
                return t && i(e.prototype, t),
                    n && i(e, n),
                    e
            }
            function a() {
                return (a = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }
                ).apply(this, arguments)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var s = n(6)
                , c = n(9)
                , u = n(5)
                , d = n.n(u)
                , l = n(4)
                , f = n(0)
                , p = n(3)
                , h = n(10)
                , g = n.n(h)
                , m = n(12)
                , v = n.n(m)
                , b = Object(l.b)(0)
                , y = d.a.EVENTS
                , S = y.AUCTION_END
                , w = y.BID_REQUESTED
                , C = y.BID_ADJUSTMENT
                , T = y.BID_RESPONSE
                , x = y.BID_WON
                , E = "https://pba.aws.lijit.com/analytics"
                , I = {}
                , A = function (e) {
                    var t = e.err
                        , n = e.topFrame
                        , r = "";
                    if (t)
                        try {
                            try {
                                r = window.top.location.href
                            } catch (e) {
                                var i = window.location.ancestorOrigins;
                                r = i[i.length - 1]
                            }
                        } catch (e) {
                            r = n.document.referrer
                        }
                    else
                        r = n.location.href;
                    return r
                }(function () {
                    var e = window;
                    try {
                        for (; e.parent.document !== e.document;) {
                            if (!e.parent.document)
                                throw new Error;
                            e = e.parent
                        }
                    } catch (e) { }
                    return {
                        topFrame: e,
                        err: !1
                    }
                }())
                , O = a(Object(s.a)({
                    url: E,
                    analyticsType: "endpoint"
                }), {
                    track: function (e) {
                        var t = e.eventType
                            , n = e.args;
                        try {
                            if (t === x)
                                return void new j(this.sovrnId, n).send();
                            if (n && n.auctionId && I[n.auctionId] && "complete" === I[n.auctionId].status)
                                throw new Error("Event Received after Auction Close Auction Id " + n.auctionId);
                            switch (n && n.auctionId && void 0 === I[n.auctionId] && (I[n.auctionId] = new k(this.sovrnId, n.auctionId)),
                            t) {
                                case w:
                                    I[n.auctionId].bidRequested(n);
                                    break;
                                case C:
                                    I[n.auctionId].originalBid(n);
                                    break;
                                case T:
                                    I[n.auctionId].adjustedBid(n);
                                    break;
                                case S:
                                    I[n.auctionId].send()
                            }
                        } catch (e) {
                            new _(e, this.sovrnId, {
                                eventType: t,
                                args: n
                            }).send()
                        }
                    }
                });
            O.getAuctions = function () {
                return I
            }
                ,
                O.originEnableAnalytics = O.enableAnalytics,
                O.enableAnalytics = function (e) {
                    var t = "";
                    e && e.options && (e.options.sovrnId || e.options.affiliateId) ? (t = e.options.sovrnId || e.options.affiliateId,
                        O.sovrnId = t,
                        e.options.pbaUrl && (E = e.options.pbaUrl),
                        O.originEnableAnalytics(e)) : f.logError("Need Sovrn Id to log auction results. Please contact a Sovrn representative if you do not know your Sovrn Id.")
                }
                ,
                c.default.registerAnalyticsAdapter({
                    adapter: O,
                    code: "sovrn"
                });
            var j = function () {
                function e(t, n) {
                    r(this, e),
                        this.body = {},
                        this.body.prebidVersion = "prebid_prebid_4.14.0",
                        this.body.sovrnId = t,
                        this.body.winningBid = JSON.parse(JSON.stringify(n)),
                        this.body.url = A,
                        this.body.payload = "winner",
                        delete this.body.winningBid.ad
                }
                return o(e, [{
                    key: "send",
                    value: function () {
                        this.body.ts = f.timestamp(),
                            b(E, null, JSON.stringify(this.body), {
                                contentType: "application/json",
                                method: "POST"
                            })
                    }
                }]),
                    e
            }()
                , k = function () {
                    function e(t, n) {
                        r(this, e),
                            this.auction = {},
                            this.auction.prebidVersion = "prebid_prebid_4.14.0",
                            this.auction.sovrnId = t,
                            this.auction.auctionId = n,
                            this.auction.payload = "auction",
                            this.auction.timeouts = {
                                buffer: p.b.getConfig("timeoutBuffer"),
                                bidder: p.b.getConfig("bidderTimeout")
                            },
                            this.auction.priceGranularity = p.b.getConfig("priceGranularity"),
                            this.auction.url = A,
                            this.auction.requests = [],
                            this.auction.unsynced = [],
                            this.dropBidFields = ["auctionId", "ad", "requestId", "bidderCode"],
                            setTimeout(function (e) {
                                delete I[e]
                            }, 3e5, this.auction.auctionId)
                    }
                    return o(e, [{
                        key: "bidRequested",
                        value: function (e) {
                            var t = JSON.parse(JSON.stringify(e));
                            delete t.doneCbCallCount,
                                delete t.auctionId,
                                this.auction.requests.push(t)
                        }
                    }, {
                        key: "findBid",
                        value: function (e) {
                            var t = g()(this.auction.requests, function (t) {
                                return t.bidderCode === e.bidderCode
                            });
                            t || this.auction.unsynced.push(JSON.parse(JSON.stringify(e)));
                            var n = g()(t.bids, function (t) {
                                return t.bidId === e.requestId
                            });
                            return n || (e.unmatched = !0,
                                t.bids.push(JSON.parse(JSON.stringify(e)))),
                                n
                        }
                    }, {
                        key: "originalBid",
                        value: function (e) {
                            var t = this.findBid(e);
                            t && (a(t, JSON.parse(JSON.stringify(e))),
                                this.dropBidFields.forEach(function (e) {
                                    return delete t[e]
                                }))
                        }
                    }, {
                        key: "adjustedBid",
                        value: function (e) {
                            var t = this
                                , n = this.findBid(e);
                            n && (n.originalValues = Object.keys(e).reduce(function (r, i) {
                                return JSON.stringify(n[i]) === JSON.stringify(e[i]) || v()(t.dropBidFields, i) || (r[i] = n[i],
                                    n[i] = e[i]),
                                    r
                            }, {}))
                        }
                    }, {
                        key: "send",
                        value: function () {
                            var e = this
                                , t = {};
                            this.auction.requests.forEach(function (e) {
                                e.bids.forEach(function (e) {
                                    t[e.adUnitCode] = t[e.adUnitCode] || {
                                        cpm: 0
                                    },
                                        e.cpm > t[e.adUnitCode].cpm && (t[e.adUnitCode] = e)
                                })
                            }),
                                Object.keys(t).forEach(function (e) {
                                    t[e].isAuctionWinner = !0
                                }),
                                this.auction.ts = f.timestamp(),
                                b(E, function () {
                                    I[e.auction.auctionId] = {
                                        status: "complete",
                                        auctionId: e.auction.auctionId
                                    }
                                }, JSON.stringify(this.auction), {
                                    contentType: "application/json",
                                    method: "POST"
                                })
                        }
                    }]),
                        e
                }()
                , _ = function () {
                    function e(t, n, i) {
                        r(this, e),
                            this.error = {},
                            this.error.payload = "error",
                            this.error.message = t.message,
                            this.error.stack = t.stack,
                            this.error.data = i,
                            this.error.prebidVersion = "prebid_prebid_4.14.0",
                            this.error.sovrnId = n,
                            this.error.url = A,
                            this.error.userAgent = navigator.userAgent
                    }
                    return o(e, [{
                        key: "send",
                        value: function () {
                            this.error.data && this.error.data.requests && this.error.data.requests.forEach(function (e) {
                                e.bids && e.bids.forEach(function (e) {
                                    e.ad && delete e.ad
                                })
                            }),
                                ErrorEvent.data && this.error.data.ad && delete this.error.data.ad,
                                this.error.ts = f.timestamp(),
                                b(E, null, JSON.stringify(this.error), {
                                    contentType: "application/json",
                                    method: "POST"
                                })
                        }
                    }]),
                        e
                }();
            t.default = O
        }
    }, [774]),
    pbjsChunk([8], {
        32: function (e, t, n) {
            "use strict";
            function r(e, t) {
                var n = o[t];
                if (n && e) {
                    var r = {};
                    r.source = n.source;
                    var a = i.isFn(n.getValue) ? n.getValue(e) : e;
                    if (i.isStr(a)) {
                        var s = {
                            id: a,
                            atype: n.atype
                        };
                        if (i.isFn(n.getUidExt)) {
                            var c = n.getUidExt(e);
                            c && (s.ext = c)
                        }
                        if (r.uids = [s],
                            i.isFn(n.getEidExt)) {
                            var u = n.getEidExt(e);
                            u && (r.ext = u)
                        }
                        return r
                    }
                }
                return null
            }
            t.a = function (e) {
                var t = [];
                for (var n in e)
                    if (e.hasOwnProperty(n))
                        if ("pubProvidedId" === n)
                            t = t.concat(e.pubProvidedId);
                        else {
                            var i = r(e[n], n);
                            i && t.push(i)
                        }
                return t
            }
                ;
            var i = n(0)
                , o = {
                    intentIqId: {
                        source: "intentiq.com",
                        atype: 1
                    },
                    pubcid: {
                        source: "pubcid.org",
                        atype: 1
                    },
                    tdid: {
                        source: "adserver.org",
                        atype: 1,
                        getUidExt: function () {
                            return {
                                rtiPartner: "TDID"
                            }
                        }
                    },
                    id5id: {
                        getValue: function (e) {
                            return e.uid
                        },
                        source: "id5-sync.com",
                        atype: 1,
                        getEidExt: function (e) {
                            if (e.ext)
                                return e.ext
                        }
                    },
                    parrableId: {
                        source: "parrable.com",
                        atype: 1,
                        getValue: function (e) {
                            return e.eid ? e.eid : e.ccpaOptout ? "" : null
                        },
                        getUidExt: function (e) {
                            var t = i.pick(e, ["ibaOptout", "ccpaOptout"]);
                            if (Object.keys(t).length)
                                return t
                        }
                    },
                    idl_env: {
                        source: "liveramp.com",
                        atype: 1
                    },
                    lipb: {
                        getValue: function (e) {
                            return e.lipbid
                        },
                        source: "liveintent.com",
                        atype: 1,
                        getEidExt: function (e) {
                            if (Array.isArray(e.segments) && e.segments.length)
                                return {
                                    segments: e.segments
                                }
                        }
                    },
                    britepoolid: {
                        source: "britepool.com",
                        atype: 1
                    },
                    lotamePanoramaId: {
                        source: "crwdcntrl.net",
                        atype: 1
                    },
                    criteoId: {
                        source: "criteo.com",
                        atype: 1
                    },
                    merkleId: {
                        source: "merkleinc.com",
                        atype: 1
                    },
                    netId: {
                        source: "netid.de",
                        atype: 1
                    },
                    sharedid: {
                        source: "sharedid.org",
                        atype: 1,
                        getValue: function (e) {
                            return e.id
                        },
                        getUidExt: function (e) {
                            return e && e.third ? {
                                third: e.third
                            } : void 0
                        }
                    },
                    IDP: {
                        source: "zeotap.com",
                        atype: 1
                    },
                    haloId: {
                        source: "audigent.com",
                        atype: 1
                    },
                    quantcastId: {
                        source: "quantcast.com",
                        atype: 1
                    },
                    idx: {
                        source: "idx.lat",
                        atype: 1
                    },
                    vmuid: {
                        source: "verizonmedia.com",
                        atype: 1
                    }
                }
        },
        776: function (e, t, n) {
            e.exports = n(777)
        },
        777: function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "spec", function () {
                    return s
                });
            var r = n(0)
                , i = n(1)
                , o = n(2)
                , a = n(32)
                , s = {
                    code: "sovrn",
                    supportedMediaTypes: [o.b],
                    gvlid: 13,
                    isBidRequestValid: function (e) {
                        return !(!e.params.tagid || isNaN(parseFloat(e.params.tagid)) || !isFinite(e.params.tagid))
                    },
                    buildRequests: function (e, t) {
                        try {
                            var n, i, o, s, c = [], u = [];
                            r._each(e, function (e) {
                                !o && e.userId && (o = Object(a.a)(e.userId)).forEach(function (e) {
                                    e.uids && e.uids[0] && ("criteo.com" === e.source && (s = e.uids[0].id),
                                        u.push({
                                            source: e.source,
                                            uid: e.uids[0].id
                                        }))
                                }),
                                    e.schain && (i = i || e.schain),
                                    n = n || r.getBidIdParameter("iv", e.params);
                                var t = e.mediaTypes && e.mediaTypes.banner && e.mediaTypes.banner.sizes || e.sizes
                                    , d = (t = (t = r.isArray(t) && r.isArray(t[0]) ? t : [t]).filter(function (e) {
                                        return r.isArray(e)
                                    })).map(function (e) {
                                        return {
                                            w: parseInt(e[0], 10),
                                            h: parseInt(e[1], 10)
                                        }
                                    });
                                c.push({
                                    adunitcode: e.adUnitCode,
                                    id: e.bidId,
                                    banner: {
                                        format: d,
                                        w: 1,
                                        h: 1
                                    },
                                    tagid: String(r.getBidIdParameter("tagid", e.params)),
                                    bidfloor: r.getBidIdParameter("bidfloor", e.params)
                                })
                            });
                            var d = t.refererInfo.referer
                                , l = r.parseUrl(d).hostname
                                , f = {
                                    id: r.getUniqueIdentifierStr(),
                                    imp: c,
                                    site: {
                                        page: d,
                                        domain: l
                                    }
                                };
                            i && (f.source = {
                                ext: {
                                    schain: i
                                }
                            }),
                                t.gdprConsent && (r.deepSetValue(f, "regs.ext.gdpr", +t.gdprConsent.gdprApplies),
                                    r.deepSetValue(f, "user.ext.consent", t.gdprConsent.consentString)),
                                t.uspConsent && r.deepSetValue(f, "regs.ext.us_privacy", t.uspConsent),
                                o && (r.deepSetValue(f, "user.ext.eids", o),
                                    r.deepSetValue(f, "user.ext.tpid", u),
                                    s && r.deepSetValue(f, "user.ext.prebid_criteoid", s));
                            var p = "https://ap.lijit.com/rtb/bid?src=prebid_prebid_4.14.0";
                            return n && (p += "&iv=".concat(n)),
                            {
                                method: "POST",
                                url: p,
                                data: JSON.stringify(f),
                                options: {
                                    contentType: "text/plain"
                                }
                            }
                        } catch (e) {
                            r.logError("Could not build bidrequest, error deatils:", e)
                        }
                    },
                    interpretResponse: function (e) {
                        var t = e.body
                            , n = t.id
                            , i = t.seatbid;
                        try {
                            var a = [];
                            return n && i && 0 < i.length && i[0].bid && 0 < i[0].bid.length && i[0].bid.map(function (e) {
                                a.push({
                                    requestId: e.impid,
                                    cpm: parseFloat(e.price),
                                    width: parseInt(e.w),
                                    height: parseInt(e.h),
                                    creativeId: e.crid || e.id,
                                    dealId: e.dealid || null,
                                    currency: "USD",
                                    netRevenue: !0,
                                    mediaType: o.b,
                                    ad: decodeURIComponent("".concat(e.adm, '<img src="').concat(e.nurl, '">')),
                                    ttl: e.ttl || 90
                                })
                            }),
                                a
                        } catch (e) {
                            r.logError("Could not intrepret bidresponse, error deatils:", e)
                        }
                    },
                    getUserSyncs: function (e, t, n, i) {
                        try {
                            var o = [];
                            if (t && 0 !== t.length) {
                                if (e.iframeEnabled) {
                                    var a = t.filter(function (e) {
                                        return r.deepAccess(e, "body.ext.iid")
                                    }).map(function (e) {
                                        return e.body.ext.iid
                                    })
                                        , s = [];
                                    n && n.gdprApplies && "string" == typeof n.consentString && s.push(["gdpr_consent", n.consentString]),
                                        i && s.push(["us_privacy", i]),
                                        a[0] && (s.push(["informer", a[0]]),
                                            o.push({
                                                type: "iframe",
                                                url: "https://ap.lijit.com/beacon?" + s.map(function (e) {
                                                    return e.join("=")
                                                }).join("&")
                                            }))
                                }
                                e.pixelEnabled && t.filter(function (e) {
                                    return r.deepAccess(e, "body.ext.sync.pixels")
                                }).reduce(function (e, t) {
                                    return e.concat(t.body.ext.sync.pixels)
                                }, []).map(function (e) {
                                    return e.url
                                }).forEach(function (e) {
                                    return o.push({
                                        type: "image",
                                        url: e
                                    })
                                })
                            }
                            return o
                        } catch (e) {
                            return []
                        }
                    }
                };
            Object(i.registerBidder)(s)
        }
    }, [776]),
    pbjsChunk([4], {
        32: function (e, t, n) {
            "use strict";
            function r(e, t) {
                var n = o[t];
                if (n && e) {
                    var r = {};
                    r.source = n.source;
                    var a = i.isFn(n.getValue) ? n.getValue(e) : e;
                    if (i.isStr(a)) {
                        var s = {
                            id: a,
                            atype: n.atype
                        };
                        if (i.isFn(n.getUidExt)) {
                            var c = n.getUidExt(e);
                            c && (s.ext = c)
                        }
                        if (r.uids = [s],
                            i.isFn(n.getEidExt)) {
                            var u = n.getEidExt(e);
                            u && (r.ext = u)
                        }
                        return r
                    }
                }
                return null
            }
            t.a = function (e) {
                var t = [];
                for (var n in e)
                    if (e.hasOwnProperty(n))
                        if ("pubProvidedId" === n)
                            t = t.concat(e.pubProvidedId);
                        else {
                            var i = r(e[n], n);
                            i && t.push(i)
                        }
                return t
            }
                ;
            var i = n(0)
                , o = {
                    intentIqId: {
                        source: "intentiq.com",
                        atype: 1
                    },
                    pubcid: {
                        source: "pubcid.org",
                        atype: 1
                    },
                    tdid: {
                        source: "adserver.org",
                        atype: 1,
                        getUidExt: function () {
                            return {
                                rtiPartner: "TDID"
                            }
                        }
                    },
                    id5id: {
                        getValue: function (e) {
                            return e.uid
                        },
                        source: "id5-sync.com",
                        atype: 1,
                        getEidExt: function (e) {
                            if (e.ext)
                                return e.ext
                        }
                    },
                    parrableId: {
                        source: "parrable.com",
                        atype: 1,
                        getValue: function (e) {
                            return e.eid ? e.eid : e.ccpaOptout ? "" : null
                        },
                        getUidExt: function (e) {
                            var t = i.pick(e, ["ibaOptout", "ccpaOptout"]);
                            if (Object.keys(t).length)
                                return t
                        }
                    },
                    idl_env: {
                        source: "liveramp.com",
                        atype: 1
                    },
                    lipb: {
                        getValue: function (e) {
                            return e.lipbid
                        },
                        source: "liveintent.com",
                        atype: 1,
                        getEidExt: function (e) {
                            if (Array.isArray(e.segments) && e.segments.length)
                                return {
                                    segments: e.segments
                                }
                        }
                    },
                    britepoolid: {
                        source: "britepool.com",
                        atype: 1
                    },
                    lotamePanoramaId: {
                        source: "crwdcntrl.net",
                        atype: 1
                    },
                    criteoId: {
                        source: "criteo.com",
                        atype: 1
                    },
                    merkleId: {
                        source: "merkleinc.com",
                        atype: 1
                    },
                    netId: {
                        source: "netid.de",
                        atype: 1
                    },
                    sharedid: {
                        source: "sharedid.org",
                        atype: 1,
                        getValue: function (e) {
                            return e.id
                        },
                        getUidExt: function (e) {
                            return e && e.third ? {
                                third: e.third
                            } : void 0
                        }
                    },
                    IDP: {
                        source: "zeotap.com",
                        atype: 1
                    },
                    haloId: {
                        source: "audigent.com",
                        atype: 1
                    },
                    quantcastId: {
                        source: "quantcast.com",
                        atype: 1
                    },
                    idx: {
                        source: "idx.lat",
                        atype: 1
                    },
                    vmuid: {
                        source: "verizonmedia.com",
                        atype: 1
                    }
                }
        },
        836: function (e, t, n) {
            e.exports = n(837)
        },
        837: function (e, t, n) {
            "use strict";
            function r(e, t) {
                var n = e.config.storage
                    , r = "function" == typeof e.submodule.domainOverride ? e.submodule.domainOverride() : null;
                try {
                    var i = j.isPlainObject(t) ? JSON.stringify(t) : t
                        , o = new Date(Date.now() + 864e5 * n.expires).toUTCString();
                    n.type === M ? (F.setCookie(n.name, i, o, "Lax", r),
                        "number" == typeof n.refreshInSeconds && F.setCookie("".concat(n.name, "_last"), (new Date).toUTCString(), o, "Lax", r)) : n.type === q && (F.setDataInLocalStorage("".concat(n.name, "_exp"), o),
                            F.setDataInLocalStorage(n.name, encodeURIComponent(i)),
                            "number" == typeof n.refreshInSeconds && F.setDataInLocalStorage("".concat(n.name, "_last"), (new Date).toUTCString()))
                } catch (e) {
                    j.logError(e)
                }
            }
            function i(e, t) {
                var n, r = 1 < arguments.length && void 0 !== t ? t : void 0, i = r ? "".concat(e.name, "_").concat(r) : e.name;
                try {
                    if (e.type === M)
                        n = F.getCookie(i);
                    else if (e.type === q) {
                        var o = F.getDataFromLocalStorage("".concat(e.name, "_exp"));
                        "" === o ? n = F.getDataFromLocalStorage(i) : o && 0 < new Date(o).getTime() - Date.now() && (n = decodeURIComponent(F.getDataFromLocalStorage(i)))
                    }
                    "string" == typeof n && "{" === n.charAt(0) && (n = JSON.parse(n))
                } catch (e) {
                    j.logError(e)
                }
                return n
            }
            function o(e) {
                var t = {
                    consentString: "",
                    gdprApplies: !1,
                    apiVersion: 0
                };
                return e && (t.consentString = e.consentString,
                    t.gdprApplies = e.gdprApplies,
                    t.apiVersion = e.apiVersion),
                    j.cyrb53Hash(JSON.stringify(t))
            }
            function a(e) {
                try {
                    var t = new Date(Date.now() + 864e5 * $.expires).toUTCString();
                    F.setCookie($.name, o(e), t, "Lax")
                } catch (e) {
                    j.logError(e)
                }
            }
            function s() {
                try {
                    return F.getCookie($.name)
                } catch (e) {
                    j.logError(e)
                }
            }
            function c(e) {
                if (e && "boolean" == typeof e.gdprApplies && e.gdprApplies) {
                    if (!e.consentString)
                        return;
                    if (1 === e.apiVersion && !1 === j.deepAccess(e, "vendorData.purposeConsents.1"))
                        return;
                    if (2 === e.apiVersion && !1 === j.deepAccess(e, "vendorData.purpose.consents.1"))
                        return
                }
                return 1
            }
            function u(e, t) {
                var n = t ? j.delayExecution(t, e.length) : function () { }
                    ;
                e.forEach(function (e) {
                    e.callback(function (t) {
                        t ? (e.config.storage && r(e, t),
                            e.idObj = e.submodule.decode(t, e.config)) : j.logInfo("".concat(B, ": ").concat(e.submodule.name, " - request id responded with an empty value")),
                            n()
                    }),
                        e.callback = void 0
                }),
                    clearTimeout(w)
            }
            function d(e) {
                return Array.isArray(e) && e.length ? e.filter(function (e) {
                    return j.isPlainObject(e.idObj) && Object.keys(e.idObj).length
                }).reduce(function (e, t) {
                    return Object.keys(t.idObj).forEach(function (n) {
                        e[n] = t.idObj[n]
                    }),
                        e
                }, {}) : {}
            }
            function l(e) {
                var t = !1;
                if (void 0 === S && (S = function (e, t) {
                    var n = s();
                    a(t);
                    var r = Y(e, t)
                        , i = r.userIdModules;
                    return r.hasValidated || c(t) ? i.reduce(function (e, r) {
                        return m(r, t, n, !1),
                            e.push(r),
                            e
                    }, []) : (j.logWarn("".concat(B, " - gdpr permission not valid for local storage or cookies, exit module")),
                        [])
                }(G, _.gdprDataHandler.getConsentData())).length) {
                    var n = S.filter(function (e) {
                        return j.isFn(e.callback)
                    });
                    if (n.length)
                        if (e && 0 < T) {
                            var r = !(t = !0)
                                , i = function () {
                                    r || (r = !0,
                                        e())
                                };
                            j.logInfo("".concat(B, " - auction delayed by ").concat(T, " at most to fetch ids")),
                                w = setTimeout(i, T),
                                u(n, i)
                        } else
                            O.a.on(N.a.EVENTS.AUCTION_END, function e() {
                                O.a.off(N.a.EVENTS.AUCTION_END, e),
                                    0 < C ? setTimeout(function () {
                                        u(n)
                                    }, C) : u(n)
                            })
                }
                e && !t && e()
            }
            function f(e, t) {
                l(function () {
                    !function (e, t) {
                        if (![e].some(function (e) {
                            return !Array.isArray(e) || !e.length
                        })) {
                            var n = d(t)
                                , r = Object(R.a)(n);
                            Object.keys(n).length && e.forEach(function (e) {
                                e.bids && j.isArray(e.bids) && e.bids.forEach(function (e) {
                                    e.userId = n,
                                        e.userIdAsEids = r
                                })
                            })
                        }
                    }(t.adUnits || Object(k.a)().adUnits, S),
                        e.call(this, t)
                })
            }
            function p() {
                return l(),
                    d(S)
            }
            function h() {
                return l(),
                    Object(R.a)(d(S))
            }
            function g(e, t) {
                var n = e ? e.submoduleNames : null;
                n = n || [],
                    l(function () {
                        var e = _.gdprDataHandler.getConsentData()
                            , r = s();
                        a(e);
                        var i = Y(G, e)
                            , o = i.userIdModules;
                        if (i.hasValidated || c(e)) {
                            var d = []
                                , l = !0
                                , f = !1
                                , p = void 0;
                            try {
                                for (var h, g = o[Symbol.iterator](); !(l = (h = g.next()).done); l = !0) {
                                    var v = h.value;
                                    0 < n.length && -1 === n.indexOf(v.submodule.name) || (j.logInfo("".concat(B, " - refreshing ").concat(v.submodule.name)),
                                        m(v, e, r, !0),
                                        j.isFn(v.callback) && d.push(v))
                                }
                            } catch (e) {
                                f = !0,
                                    p = e
                            } finally {
                                try {
                                    l || null == g.return || g.return()
                                } finally {
                                    if (f)
                                        throw p
                                }
                            }
                            0 < d.length && u(d),
                                t && t()
                        } else
                            j.logWarn("".concat(B, " - gdpr permission not valid for local storage or cookies, exit module"))
                    })
            }
            function m(e, t, n, a) {
                if (e.config.storage) {
                    var s, c = i(e.config.storage), u = !1;
                    if ("number" == typeof e.config.storage.refreshInSeconds) {
                        var d = new Date(i(e.config.storage, "last"));
                        u = d && Date.now() - d.getTime() > 1e3 * e.config.storage.refreshInSeconds
                    }
                    !c || u || a || (p = t,
                        null != (f = n) && f !== o(p)) ? s = e.submodule.getId(e.config, t, c) : "function" == typeof e.submodule.extendId && (s = e.submodule.extendId(e.config, c)),
                        j.isPlainObject(s) && (s.id && (r(e, s.id),
                            c = s.id),
                            "function" == typeof s.callback && (e.callback = s.callback)),
                        c && (e.idObj = e.submodule.decode(c, e.config))
                } else if (e.config.value)
                    e.idObj = e.config.value;
                else {
                    var l = e.submodule.getId(e.config, t, void 0);
                    j.isPlainObject(l) && ("function" == typeof l.callback && (e.callback = l.callback),
                        l.id && (e.idObj = e.submodule.decode(l.id, e.config)))
                }
                var f, p
            }
            function v() {
                var e, t, n = (e = V,
                    t = H,
                    Array.isArray(e) ? e.reduce(function (e, n) {
                        return !n || j.isEmptyStr(n.name) || (!n.storage || j.isEmptyStr(n.storage.type) || j.isEmptyStr(n.storage.name) || -1 === t.indexOf(n.storage.type)) && !j.isPlainObject(n.value) && (n.storage || n.value) || e.push(n),
                            e
                    }, []) : []);
                if (n.length) {
                    var r = J.filter(function (e) {
                        return !E()(G, function (t) {
                            return t.name === e.name
                        })
                    });
                    G = r.map(function (e) {
                        var t = E()(n, function (t) {
                            return t.name === e.name
                        });
                        return t ? {
                            submodule: e,
                            config: t,
                            callback: void 0,
                            idObj: void 0
                        } : null
                    }).filter(function (e) {
                        return null !== e
                    }),
                        !W && G.length && (Object(k.a)().requestBids.before(f, 40),
                            j.logInfo("".concat(B, " - usersync config updated for ").concat(G.length, " submodules")),
                            W = !0)
                }
            }
            function b(e) {
                E()(J, function (t) {
                    return t.name === e.name
                }) || (J.push(e),
                    v())
            }
            function y(e) {
                G = [],
                    W = !(V = []),
                    S = void 0,
                    -1 === (H = [F.localStorageIsEnabled() ? q : null, F.cookiesAreEnabled() ? M : null].filter(function (e) {
                        return null !== e
                    })).indexOf(M) || !F.getCookie("_pbjs_id_optout") && !F.getCookie("_pubcid_optout") ? -1 === H.indexOf(q) || !F.getDataFromLocalStorage("_pbjs_id_optout") && !F.getDataFromLocalStorage("_pubcid_optout") ? (e.getConfig(function (e) {
                        var t = e.userSync;
                        t && t.userIds && (V = t.userIds,
                            C = j.isNumber(t.syncDelay) ? t.syncDelay : z,
                            T = j.isNumber(t.auctionDelay) ? t.auctionDelay : L,
                            v())
                    }),
                        Object(k.a)().getUserIds = p,
                        Object(k.a)().getUserIdsAsEids = h,
                        Object(k.a)().refreshUserIds = g) : j.logInfo("".concat(B, " - opt-out localStorage found, exit module")) : j.logInfo("".concat(B, " - opt-out cookie found, exit module"))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                n.d(t, "coreStorage", function () {
                    return F
                }),
                n.d(t, "syncDelay", function () {
                    return C
                }),
                n.d(t, "auctionDelay", function () {
                    return T
                }),
                t.setSubmoduleRegistry = function (e) {
                    J = e
                }
                ,
                t.setStoredValue = r,
                t.setStoredConsentData = a,
                t.requestBidsHook = f,
                n.d(t, "validateGdprEnforcement", function () {
                    return Y
                }),
                t.attachIdSystem = b,
                t.init = y;
            var S, w, C, T, x = n(10), E = n.n(x), I = n(3), A = n(8), O = n.n(A), j = n(0), k = n(21), _ = n(9), D = n(5), N = n.n(D), U = n(13), R = n(32), P = n(7), B = "User ID", M = "cookie", q = "html5", z = 500, L = 0, $ = {
                name: "_pbjs_userid_consent_data",
                expires: 30
            }, F = Object(P.a)("userid"), H = [], W = !1, G = [], V = [], J = [], Y = Object(U.b)("sync", function (e, t) {
                return {
                    userIdModules: e,
                    hasValidated: t && t.hasValidated
                }
            }, "validateGdprEnforcement");
            y(I.b),
                Object(U.c)("userId", b)
        }
    }, [836]),
    pbjs.processQueue(),
    "undefined" == typeof noAds || !noAds) {
    var PREBID_REFRESHED = !1
        , PREBID_TIMEOUT = 2e3
        , FAILSAFE_TIMEOUT = 3e3;
    try {
        var domain = window.top.location.hostname.replace(/^.{1,4}\./, "").replace(/\.test$/, "")
    } catch (e) {
        var domain = window.location.hostname.replace(/^.{1,4}\./, "").replace(/\.test$/, "")
    }
    var conversantIds = []
        , globalTCData = {};
    conversantIds["puzzle-nonograms.com"] = "120983",
        conversantIds["puzzle-loop.com"] = "117113",
        conversantIds["puzzle-bridges.com"] = "120982",
        conversantIds["puzzle-light-up.com"] = "120981",
        conversantIds["puzzle-killer-sudoku.com"] = "120954",
        conversantIds["puzzle-jigsaw-sudoku.com"] = "120955",
        conversantIds["puzzle-nurikabe.com"] = "120953",
        conversantIds["puzzle-shikaku.com"] = "120952";
    var oftmediaIds = [];
    oftmediaIds["puzzle-shakashaka.com"] = "20674482",
        oftmediaIds["puzzle-words.com"] = "20674484",
        oftmediaIds["puzzle-futoshiki.com"] = "20674495",
        oftmediaIds["puzzle-skyscrapers.com"] = "20674498",
        oftmediaIds["puzzle-kakurasu.com"] = "20674499",
        oftmediaIds["puzzle-star-battle.com"] = "20674500",
        oftmediaIds["puzzle-tapa.com"] = "20674501",
        oftmediaIds["puzzle-aquarium.com"] = "20674502",
        oftmediaIds["puzzle-stitches.com"] = "20674503",
        oftmediaIds["puzzle-masyu.com"] = "20674504",
        oftmediaIds["puzzle-shingoki.com"] = "20674507",
        oftmediaIds["puzzle-heyawake.com"] = "20674518",
        oftmediaIds["puzzle-hitori.com"] = "20674519",
        oftmediaIds["puzzle-pipes.com"] = "20674521",
        oftmediaIds["puzzle-battleships.com"] = "21234085";
    var oftmediaIds_side = [];
    oftmediaIds_side["puzzle-shakashaka.com"] = "20674483",
        oftmediaIds_side["puzzle-words.com"] = "20674485",
        oftmediaIds_side["puzzle-futoshiki.com"] = "20674497",
        oftmediaIds_side["puzzle-skyscrapers.com"] = "20674498",
        oftmediaIds_side["puzzle-kakurasu.com"] = "20674499",
        oftmediaIds_side["puzzle-star-battle.com"] = "20674500",
        oftmediaIds_side["puzzle-tapa.com"] = "20674501",
        oftmediaIds_side["puzzle-aquarium.com"] = "20674502",
        oftmediaIds_side["puzzle-stitches.com"] = "20674503",
        oftmediaIds_side["puzzle-masyu.com"] = "20674504",
        oftmediaIds_side["puzzle-shingoki.com"] = "20674507",
        oftmediaIds_side["puzzle-heyawake.com"] = "20674518",
        oftmediaIds_side["puzzle-hitori.com"] = "20674519",
        oftmediaIds_side["puzzle-pipes.com"] = "20674521",
        oftmediaIds_side["puzzle-battleships.com"] = "21234085";
    var adsensePassbacks = {
        bannerTop: '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-2239942281546381" data-ad-slot="5684129321"></ins>',
        bannerSide: '<ins class="adsbygoogle" style="display:inline-block;width:160px;height:600px" data-ad-client="ca-pub-2239942281546381" data-ad-slot="8076885614"></ins>'
    }
        , prebidPassbacks = {
            bannerTop: '<iframe id="postbid_iframe_bannerTop" FRAMEBORDER="0" SCROLLING="no" MARGINHEIGHT="0" MARGINWIDTH="0" TOPMARGIN="0" LEFTMARGIN="0" ALLOWTRANSPARENCY="true" WIDTH="728" HEIGHT="90"></iframe>',
            bannerSide: '<iframe id="postbid_iframe_bannerSide" FRAMEBORDER="0" SCROLLING="no" MARGINHEIGHT="0" MARGINWIDTH="0" TOPMARGIN="0" LEFTMARGIN="0" ALLOWTRANSPARENCY="true" WIDTH="160" HEIGHT="600"></iframe>'
        }
        , adUnits = [{
            code: "bannerTop",
            mediaTypes: {
                banner: {
                    sizes: [[728, 90]]
                }
            },
            bids: [{
                bidder: "sovrn",
                params: {
                    tagid: "583403",
                    bidfloor: "0.00"
                }
            }, {
                bidder: "eplanning",
                params: {
                    ci: "25c71"
                }
            }, {
                bidder: "amx",
                params: {
                    testMode: !1
                }
            }, {
                bidder: "oftmedia",
                params: {
                    placementId: "undefined" == typeof oftmediaIds[domain] ? "20673382" : oftmediaIds[domain]
                }
            }]
        }, {
            code: "bannerSide",
            mediaTypes: {
                banner: {
                    sizes: [[160, 600]]
                }
            },
            bids: [{
                bidder: "sovrn",
                params: {
                    tagid: "583402",
                    bidfloor: "0.00"
                }
            }, {
                bidder: "eplanning",
                params: {
                    ci: "25c71"
                }
            }, {
                bidder: "amx",
                params: {
                    testMode: !1
                }
            }, {
                bidder: "oftmedia",
                params: {
                    placementId: "undefined" == typeof oftmediaIds_side[domain] ? "20674481" : oftmediaIds_side[domain]
                }
            }]
        }];
    "undefined" != typeof conversantIds[domain] && (adUnits[0].bids.push({
        bidder: "conversant",
        params: {
            site_id: conversantIds[domain],
            secure: 1
        }
    }),
        adUnits[1].bids.push({
            bidder: "conversant",
            params: {
                site_id: conversantIds[domain],
                secure: 1
            }
        }));
    var customConfigObject = {
        buckets: [{
            precision: 2,
            min: 0,
            max: .02,
            increment: .01
        }, {
            precision: 2,
            min: .02,
            max: 6,
            increment: .02
        }, {
            precision: 2,
            min: 6,
            max: 16,
            increment: .2
        }, {
            precision: 2,
            min: 16,
            max: 36,
            increment: 1
        }]
    }
        , topSlot = {}
        , sideSlot = {}
        , pbjs = pbjs || {};
    pbjs.que = pbjs.que || [];
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [],
        googletag.cmd.push(function () {
            googletag.pubads().disableInitialLoad()
        }),
        pbjs.que.push(function () {
            pbjs.addAdUnits(adUnits),
                pbjs.setConfig({
                    userSync: {
                        iframeEnabled: !0,
                        debug: !0,
                        userIds: [{
                            name: "criteo"
                        }]
                    },
                    priceGranularity: customConfigObject,
                    consentManagement: {
                        gdpr: {
                            cmpApi: "iab",
                            timeout: 6e4,
                            allowAuctionWithoutConsent: !1
                        },
                        usp: {
                            timeout: 100
                        }
                    }
                });
            var e = 1.65;
            pbjs.bidderSettings = {
                conversant: {
                    bidCpmAdjustment: function (e, t) {
                        return 1.95 * e
                    }
                },
                sovrn: {
                    bidCpmAdjustment: function (t, n) {
                        return t * e
                    }
                },
                eplanning: {
                    bidCpmAdjustment: function (t, n) {
                        return t * e / 1.4
                    }
                },
                amx: {
                    bidCpmAdjustment: function (t, n) {
                        return t * e / 1.4
                    }
                },
                oftmedia: {
                    bidCpmAdjustment: function (t, n) {
                        return t * e / 1.2
                    }
                }
            },
                pbjs.requestBids({
                    bidsBackHandler: initAdserver,
                    timeout: PREBID_TIMEOUT
                })
        }),
        setTimeout(function () {
            initAdserver()
        }, FAILSAFE_TIMEOUT),
        function () {
            var e = document.createElement("script");
            e.async = !0,
                e.type = "text/javascript";
            var t = "https:" == document.location.protocol;
            e.src = (t ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(e, n)
        }(),
        googletag.cmd.push(function () {
            topSlot = googletag.defineSlot("/50413977/desktop_header", [[728, 90]], "bannerTop").addService(googletag.pubads()),
                sideSlot = googletag.defineSlot("/50413977/desktop_header", [[160, 600]], "bannerSide").addService(googletag.pubads()),
                googletag.pubads().enableSingleRequest(),
                googletag.enableServices()
        })
}
function is_touch_device() {
    if (navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i))
        return !0;
    try {
        var t = " -webkit- -moz- -o- -ms- ".split(" ")
            , e = function (t) {
                return window.matchMedia(t).matches
            };
        if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            return !0;
        var s = ["(", t.join("touch-enabled),("), "heartz", ")"].join("");
        return e(s)
    } catch (t) { }
    return !1
}
function getCurrentSettingsBag() {
    try {
        return localStorage.getItem("puzzleSettings") ? getCurrentLocalStoragePuzzleSettings() : $.extend(!0, {}, defaultSettings)
    } catch (t) {
        return "undefined" != typeof Settings ? Settings.bag : $.extend(!0, {}, defaultSettings)
    }
}
function getCurrentLocalStoragePuzzleSettings() {
    try {
        return $.extend($.extend(!0, {}, defaultSettings), JSON.parse(localStorage.getItem("puzzleSettings")))
    } catch (t) {
        return $.extend(!0, {}, defaultSettings)
    }
}
function settingsApply() {
    Game.redraw(),
        MVVM.apply(),
        setZoom(getZoom())
}
var defaultSettings = {
    "global.background": null,
    "global.left-handed": !1,
    "global.color-blind": !1,
    "global.pin-toolbar": !1,
    "global.hide-timer": !1,
    "global.non-competitive-timer": !1
}
    , puzzleSettings = {
        "binairo.show-crosshair": !1,
        "binairo.highlight-change": !1,
        "binairo.touch-mode": "both",
        "binairo.draw-style": "rotate",
        "binairo.show-counters": !1,
        "binairo.count-remaining": !0,
        "binairo.highlight-3-in-a-row": !0,
        "binairo.highlight-more-than-allowed": !0,
        "binairo.style": "circles",
        "binairo.errors-style": "discreet"
    };
defaultSettings = $.extend(!0, defaultSettings, puzzleSettings);
var Settings = {
    bag: getCurrentSettingsBag(),
    onChange: {},
    store: function (t) {
        MVVM && !t && MVVM.apply();
        try {
            return localStorage.setItem("puzzleSettings", JSON.stringify(this.bag)),
                !0
        } catch (t) {
            return !1
        }
    },
    get: function (t) {
        if (t in this.bag)
            return this.bag[t]
    },
    set: function (t, e, s) {
        return this.bag = getCurrentSettingsBag(),
            this.bag[t] = e,
            null === e && delete this.bag[t],
            t in this.onChange && this.onchange[t](e),
            window.ga && t.indexOf(".saved-scale") == -1 && t.indexOf(".draw-style") == -1 && "undefined" != typeof defaultSettings[t] && ga("send", "event", "Settings", t, e.toString()),
            this.store(s)
    },
    remove: function (t) {
        this.set(t, null)
    },
    resetDefault: function () {
        this.bag = defaultSettings,
            this.store()
    }
};
!function (t) {
    t.fn.binairo = function (e) {
        this.slug = "binairo";
        var s = t.extend({
            separatorWidth: 1,
            gutter: 15,
            puzzleWidth: 5,
            puzzleHeight: 5,
            squareSize: 26,
            task: "",
            solution: "",
            state: {},
            stateStack: [],
            checkState: 0
        }, e);
        return this.currentState = {
            cellStatus: [],
            lastMove: {},
            index: 0
        },
            this.scratch = [],
            this.dom = {
                cells: [],
                task: [],
                dots: []
            },
            this.recursion = [],
            this.sideCounters = [],
            this.bottomCounters = [],
            this.currentCell = {
                row: 0,
                col: 0
            },
            this.currentDomCell = null,
            !s.minScale && s.puzzleWidth <= 7 && (s.minScale = 1),
            s.minScale || 10 != s.puzzleWidth || (s.minScale = .7),
            s.minScale || 14 != s.puzzleWidth || (s.minScale = .5),
            s.minScale || 20 != s.puzzleWidth || (s.minScale = .4),
            !s.minScale && s.puzzleWidth >= 20 && (s.minScale = .3),
            this.getCellsSize = function (t) {
                return t * s.squareSize + s.separatorWidth * (t + 1)
            }
            ,
            this.getBoardWidth = function () {
                return 2 * s.gutter + this.getCellsSize(s.puzzleWidth + (Settings.get(this.slug + ".show-counters") ? 2 : 0))
            }
            ,
            this.getBoardHeight = function () {
                return 2 * s.gutter + this.getCellsSize(s.puzzleHeight + (Settings.get(this.slug + ".show-counters") ? 2 : 0))
            }
            ,
            this.parseTask = function () {
                if (s.task) {
                    this.loaded = !0;
                    for (var e = [], i = 0, r = 0; r < s.task.length; r++)
                        t.isNumeric(s.task[r]) ? (e[i] = s.task[r],
                            i++) : i += this.decodeChar(s.task[r]);
                    for (var r = 0; r < s.puzzleHeight; r++) {
                        this.task[r] = [];
                        for (var i = 0; i < s.puzzleWidth; i++) {
                            var o = r * s.puzzleWidth + i;
                            "undefined" == typeof e[o] ? this.task[r][i] = -1 : this.task[r][i] = parseInt(e[o])
                        }
                    }
                } else
                    this.loaded = !1;
                (s.check || s.checkState) && (this.blacks = s.check)
            }
            ,
            this.initState = function () {
                this.currentState.cellStatus = [];
                for (var t = 0; t < s.puzzleHeight; t++) {
                    this.currentState.cellStatus[t] = [],
                        this.sideCounters[t] = [];
                    for (var e = 0; e < s.puzzleWidth; e++)
                        this.bottomCounters[e] = [],
                            this.currentState.cellStatus[t][e] = 0,
                            "undefined" != typeof this.task[t] && this.task[t][e] > -1 && (this.currentState.cellStatus[t][e] = 1 == this.task[t][e] ? 1 : 2)
                }
                this.currentState.lastMove = [],
                    this.currentState.index = 0,
                    this.solved = !1,
                    this.states = [Util.clone(this.currentState)]
            }
            ,
            this.hideMoveHelpers = function () { }
            ,
            this.getDomElement = function (t) {
                return this.dom.cells[t.row][t.col]
            }
            ,
            this.getNeighbours = function (t, e) {
                var i = [];
                return e && this.currentState.cellStatus[t][e - 1] != -2 && i.push({
                    row: t,
                    col: e - 1
                }),
                    e < s.puzzleWidth - 1 && this.currentState.cellStatus[t][e + 1] != -2 && i.push({
                        row: t,
                        col: e + 1
                    }),
                    t && this.currentState.cellStatus[t - 1][e] != -2 && i.push({
                        row: t - 1,
                        col: e
                    }),
                    t < s.puzzleHeight - 1 && this.currentState.cellStatus[t + 1][e] != -2 && i.push({
                        row: t + 1,
                        col: e
                    }),
                    i
            }
            ,
            this.draw = function () {
                this.boardWidth = this.getBoardWidth(),
                    this.boardHeight = this.getBoardHeight(),
                    this.css({
                        width: this.boardWidth,
                        height: this.boardHeight
                    }),
                    this.loaded ? this.css("visibility", "visible") : this.css("visibility", "hidden"),
                    this.empty();
                var e = document.createDocumentFragment()
                    , i = 0
                    , r = 0;
                i = s.gutter,
                    r = s.gutter,
                    Settings.get(this.slug + ".show-counters") && Settings.get("global.left-handed") && (r += 2 * s.squareSize + s.separatorWidth);
                var o = t('<div class="board-back">').css({
                    position: "absolute",
                    top: i + "px",
                    left: r + "px",
                    width: this.getCellsSize(s.puzzleWidth) + "px",
                    height: this.getCellsSize(s.puzzleHeight) + "px",
                    "z-index": "100"
                });
                if (this.task.length) {
                    for (var l = 0; l < s.puzzleHeight; l++) {
                        this.dom.task[l] = [],
                            this.dom.cells[l] = [];
                        for (var n = 0; n < s.puzzleWidth; n++) {
                            var a = s.squareSize * l + s.separatorWidth * (l + 1)
                                , h = s.squareSize * n + s.separatorWidth * (n + 1)
                                , u = t('<div tabindex="1"><span></span></div>').css({
                                    position: "absolute",
                                    top: a + "px",
                                    left: h + "px",
                                    width: s.squareSize - 2 + "px",
                                    height: s.squareSize - 2 + "px"
                                });
                            u[0].row = l,
                                u[0].col = n,
                                this.task[l][n] > -1 ? u.addClass("task-cell") : u.addClass("cell selectable"),
                                this.dom.cells[l][n] = u,
                                o[0].appendChild(u[0])
                        }
                    }
                    if (Settings.get(this.slug + ".show-counters")) {
                        var c = t('<div class="side-counters">').css({
                            position: "absolute",
                            top: "0px",
                            left: (Settings.get("global.left-handed") ? 2 * -s.squareSize - 10 : this.getCellsSize(s.puzzleWidth) + 5) + "px",
                            width: 2 * s.squareSize + s.gutter + "px",
                            height: this.getCellsSize(s.puzzleHeight) + "px",
                            "z-index": "100"
                        });
                        this.dom.sideCounters = [];
                        for (var l = 0; l < s.puzzleHeight; l++) {
                            var a = s.squareSize * l + s.separatorWidth * (l + 1);
                            this.dom.sideCounters[l] = t('<div class="side-counter"><div class="counters"><span class="sc1">0</span> | <span class="sc2">0</span></div><i class="icon icon-ok"></i></div>').css({
                                position: "absolute",
                                top: a + "px",
                                left: "0px",
                                width: 2 * s.squareSize + s.gutter + "px",
                                height: s.squareSize + "px"
                            }),
                                c[0].appendChild(this.dom.sideCounters[l][0])
                        }
                        var d = t('<div class="top-counters">').css({
                            position: "absolute",
                            top: this.getCellsSize(s.puzzleHeight) + "px",
                            left: "0px",
                            width: this.getCellsSize(s.puzzleWidth) + "px",
                            height: 2 * s.squareSize + "px",
                            "z-index": "100"
                        });
                        this.dom.bottomCounters = [];
                        for (var l = 0; l < s.puzzleWidth; l++) {
                            var h = s.squareSize * l + s.separatorWidth * (l + 1);
                            this.dom.bottomCounters[l] = t('<div class="bottom-counter"><div class="counters"><span class="sc1">0</span><br /><span class="sc2">0</span></div><i class="icon icon-ok"></i></div>').css({
                                position: "absolute",
                                top: "0px",
                                left: h + "px",
                                width: s.squareSize + "px",
                                height: 2 * s.squareSize + "px"
                            }),
                                d[0].appendChild(this.dom.bottomCounters[l][0])
                        }
                        o[0].appendChild(c[0]),
                            o[0].appendChild(d[0])
                    }
                }
                e.appendChild(o[0]),
                    this.initCrosshairHelper(),
                    this[0].appendChild(e),
                    this.task.length && this.drawCurrentState()
            }
            ,
            this.drawCellStatus = function (t, e) {
                "undefined" != typeof this.dom.cells[t.row][t.col] && this.dom.cells[t.row][t.col].toggleClass("cell-off", 0 == e).toggleClass("cell-0", 2 == e).toggleClass("cell-1", 1 == e)
            }
            ,
            this.drawCurrentState = function () {
                for (var t = 0; t < s.puzzleHeight; t++)
                    for (var e = 0; e < s.puzzleWidth; e++)
                        this.drawCellStatus({
                            row: t,
                            col: e
                        }, this.currentState.cellStatus[t][e]);
                this.drawHelperHighlightMove(this.currentState.lastMove)
            }
            ,
            this.check3InARow = function () {
                for (var t = s.puzzleWidth, e = s.puzzleHeight, i = 0; i < e; i++)
                    for (var r = 0; r < t - 2; r++)
                        0 != this.currentState.cellStatus[i][r] && this.currentState.cellStatus[i][r] == this.currentState.cellStatus[i][r + 1] && this.currentState.cellStatus[i][r] == this.currentState.cellStatus[i][r + 2] && (this.dom.cells[i][r].addClass("err"),
                            this.dom.cells[i][r + 1].addClass("err"),
                            this.dom.cells[i][r + 2].addClass("err"));
                for (var i = 0; i < e - 2; i++)
                    for (var r = 0; r < t; r++)
                        0 != this.currentState.cellStatus[i][r] && this.currentState.cellStatus[i + 1][r] == this.currentState.cellStatus[i][r] && this.currentState.cellStatus[i + 2][r] == this.currentState.cellStatus[i][r] && (this.dom.cells[i][r].addClass("err"),
                            this.dom.cells[i + 1][r].addClass("err"),
                            this.dom.cells[i + 2][r].addClass("err"))
            }
            ,
            this.checkMoreThanAllowed = function () {
                for (var t = s.puzzleWidth, e = s.puzzleHeight, i = 0; i < e; i++) {
                    for (var r = cb = 0, o = 0; o < t; o++)
                        1 == this.currentState.cellStatus[i][o] && r++,
                            2 == this.currentState.cellStatus[i][o] && cb++;
                    if (r > t / 2)
                        for (var o = 0; o < t; o++)
                            1 == this.currentState.cellStatus[i][o] && this.dom.cells[i][o].addClass("err");
                    if (cb > t / 2)
                        for (var o = 0; o < t; o++)
                            2 == this.currentState.cellStatus[i][o] && this.dom.cells[i][o].addClass("err")
                }
                for (var o = 0; o < t; o++) {
                    for (var r = cb = 0, i = 0; i < e; i++)
                        1 == this.currentState.cellStatus[i][o] && r++,
                            2 == this.currentState.cellStatus[i][o] && cb++;
                    if (r > e / 2)
                        for (var i = 0; i < e; i++)
                            1 == this.currentState.cellStatus[i][o] && this.dom.cells[i][o].addClass("err");
                    if (cb > e / 2)
                        for (var i = 0; i < e; i++)
                            2 == this.currentState.cellStatus[i][o] && this.dom.cells[i][o].addClass("err")
                }
            }
            ,
            this.checkDuplicates = function () {
                for (var t = s.puzzleWidth, e = s.puzzleHeight, i = 0; i < e - 1; i++)
                    for (var r = i + 1; r < e; r++) {
                        for (var o = !0, l = 0; l < t && o; l++)
                            this.currentState.cellStatus[i][l] == this.currentState.cellStatus[r][l] && this.currentState.cellStatus[i][l] && this.currentState.cellStatus[r][l] || (o = !1);
                        if (o)
                            for (var l = 0; l < t; l++)
                                this.dom.cells[i][l].addClass("err"),
                                    this.dom.cells[r][l].addClass("err")
                    }
                for (var l = 0; l < t - 1; l++)
                    for (var n = l + 1; n < t; n++) {
                        for (var o = !0, i = 0; i < e && o; i++)
                            this.currentState.cellStatus[i][l] == this.currentState.cellStatus[i][n] && this.currentState.cellStatus[i][l] && this.currentState.cellStatus[i][n] || (o = !1);
                        if (o)
                            for (var i = 0; i < e; i++)
                                this.dom.cells[i][l].addClass("err"),
                                    this.dom.cells[i][n].addClass("err")
                    }
            }
            ,
            this.updateCounters = function () {
                for (var t = s.puzzleWidth, e = s.puzzleHeight, i = 0; i < e; i++)
                    this.sideCounters[i][0] = this.sideCounters[i][1] = 0;
                for (var r = 0; r < t; r++)
                    this.bottomCounters[r][0] = this.bottomCounters[r][1] = 0;
                for (var i = 0; i < e; i++)
                    for (var r = 0; r < t; r++)
                        if (this.currentState.cellStatus[i][r] > 0) {
                            var o = this.currentState.cellStatus[i][r] - 1;
                            this.sideCounters[i][o]++,
                                this.bottomCounters[r][o]++
                        }
                for (var i = 0; i < e; i++) {
                    var l = this.dom.sideCounters[i];
                    this.sideCounters[i][0] == this.sideCounters[i][1] && this.sideCounters[i][0] + this.sideCounters[i][1] == t ? (l.find(".counters").hide(),
                        l.find(".icon").show()) : (l.find(".counters").show(),
                            l.find(".icon").hide()),
                        l.find(".sc1").text(Settings.get(this.slug + ".count-remaining") ? t / 2 - this.sideCounters[i][0] : this.sideCounters[i][0]).toggleClass("err", this.sideCounters[i][0] > t / 2).toggleClass("succ", this.sideCounters[i][0] == t / 2),
                        l.find(".sc2").text(Settings.get(this.slug + ".count-remaining") ? t / 2 - this.sideCounters[i][1] : this.sideCounters[i][1]).toggleClass("err", this.sideCounters[i][1] > t / 2).toggleClass("succ", this.sideCounters[i][1] == t / 2)
                }
                for (var r = 0; r < t; r++) {
                    var l = this.dom.bottomCounters[r];
                    this.bottomCounters[r][0] == this.bottomCounters[r][1] && this.bottomCounters[r][0] + this.bottomCounters[r][1] == e ? (l.find(".counters").hide(),
                        l.find(".icon").show()) : (l.find(".counters").show(),
                            l.find(".icon").hide()),
                        l.find(".sc1").text(Settings.get(this.slug + ".count-remaining") ? e / 2 - this.bottomCounters[r][0] : this.bottomCounters[r][0]).toggleClass("err", this.bottomCounters[r][0] > e / 2).toggleClass("succ", this.bottomCounters[r][0] == e / 2),
                        l.find(".sc2").text(Settings.get(this.slug + ".count-remaining") ? e / 2 - this.bottomCounters[r][1] : this.bottomCounters[r][1]).toggleClass("err", this.bottomCounters[r][1] > e / 2).toggleClass("succ", this.bottomCounters[r][1] == e / 2)
                }
            }
            ,
            this.drawHelperHighlightMove = function (e) {
                if (Settings.get(this.slug + ".highlight-change") && (t(".cell-active").removeClass("cell-active"),
                    e.cells))
                    for (var i = 0; i < e.cells.length; i++)
                        this.highlightCell(e.cells[i], "cell-active");
                this.find(".err").removeClass("err"),
                    (Settings.get(this.slug + ".highlight-3-in-a-row") || s.tutorial) && this.check3InARow(),
                    (Settings.get(this.slug + ".highlight-more-than-allowed") || s.tutorial) && this.checkMoreThanAllowed(),
                    (Settings.get(this.slug + ".highlight-duplicates") || s.tutorial) && this.checkDuplicates(),
                    Settings.get(this.slug + ".show-counters") && this.updateCounters()
            }
            ,
            this.highlightCrosshairCell = function (e) {
                t(".cell-crosshair").removeClass("cell-crosshair"),
                    e.length && e.addClass("cell-crosshair")
            }
            ,
            this.repositionHelpers = function () {
                this.task.length && Settings.get(this.slug + ".show-crosshair") && this.highlightCrosshairCell(this.getCrosshairTarget())
            }
            ,
            this.performMove = function (t) {
                this.drawing && (this.currentMove.endPoint.row == t.row && this.currentMove.endPoint.col == t.col || (this.resetCurrentMoveDraw(),
                    this.currentMove.endPoint = {
                        row: t.row,
                        col: t.col
                    },
                    this.currentMove.cells.push({
                        row: t.row,
                        col: t.col
                    }),
                    this.drawCurrentMove()))
            }
            ,
            this.stateChangedBoard = function () {
                for (var t = 0; t < s.puzzleHeight; t++)
                    for (var e = 0; e < s.puzzleWidth; e++)
                        if (this.currentState.cellStatus[t][e] != this.states[this.currentState.index].cellStatus[t][e])
                            return !0;
                return !1
            }
            ,
            this.loadState = function (t) {
                if (t.board)
                    for (var e = 0, i = 0; i < s.puzzleHeight; i++)
                        for (var r = 0; r < s.puzzleWidth; r++) {
                            var o = t.board[e];
                            this.currentState.cellStatus[i][r] = 1 - 1 * o + 1,
                                e++
                        }
            }
            ,
            this.serializeState = function () {
                for (var t = "", e = ["n", "1", "0"], i = 0; i < s.puzzleHeight; i++)
                    for (var r = 0; r < s.puzzleWidth; r++)
                        t += e[this.currentState.cellStatus[i][r]];
                return t
            }
            ,
            this.serializeSolution = function () {
                for (var t = "", e = 0; e < s.puzzleHeight; e++)
                    for (var i = 0; i < s.puzzleWidth; i++)
                        t += 1 == this.currentState.cellStatus[e][i] ? "1" : 2 == this.currentState.cellStatus[e][i] ? "0" : "n";
                return t
            }
            ,
            this.getMarkedCount = function () {
                for (var t = 0, e = 0; e < s.puzzleHeight; e++)
                    for (var i = 0; i < s.puzzleWidth; i++)
                        this.currentState.cellStatus[e][i] > 0 && t++;
                return t
            }
            ,
            this.getCurrentStatus = function (t) {
                return this.currentState.cellStatus[t.row][t.col]
            }
            ,
            this.setCellState = function (t, e) {
                this.currentState.cellStatus[t.row][t.col] = e
            }
            ,
            this.startMove = function (t, e, s, i) {
                return this.task[t.row][t.col] == -1 && (this.initCurrentMove(),
                    this.drawing = !0,
                    this.currentMove.cellStatus = "undefined" != typeof i ? i : this.getNextStatus(t, e),
                    this.currentMove.startPoint = {
                        row: t.row,
                        col: t.col
                    },
                    this.currentMove.endPoint = {
                        row: t.row,
                        col: t.col
                    },
                    this.currentMove.cells.push({
                        row: t.row,
                        col: t.col
                    }),
                    void (s && this.drawCurrentMove()))
            }
            ,
            this.getTarget = function (e) {
                var s = this.getChangedTouch(e)
                    , i = !1
                    , r = !1
                    , o = this.getScale();
                "touchstart" != e.type && "touchmove" != e.type && (r = 3 == e.which || 1 == e.which && (e.ctrlKey || e.metaKey),
                    i = !0);
                var l = t(document.elementFromPoint(s.clientX, s.clientY));
                return l.hasClass("board-back") && (l = this.findNearestCell(s.clientX, s.clientY)),
                {
                    target: l,
                    draw: i,
                    scale: o,
                    inverse: r,
                    changedTouch: s
                }
            }
            ,
            this.handleTouchStart = function (e) {
                var s = this.getTarget(e)
                    , i = s.target;
                if (this.inputMode = "mouse",
                    this.toggleClass("kbd", !1),
                    !i)
                    return !1;
                if (i.hasClass("cell"))
                    ;
                else if (i.parent().hasClass("cell"))
                    i = i.parent();
                else {
                    if (!i.parent().parent().hasClass("cell"))
                        return !1;
                    i = i.parent().parent()
                }
                this.startMove(i[0], s.inverse, s.draw),
                    s.draw && (t(".active").removeClass("active"),
                        this.dragMonitor.decision = "draw")
            }
            ,
            this.eventsTouchMove = function (t) { }
            ,
            this.eventsCrosshairMouseDown = function (t, e) {
                e.hasClass("cell") && (this.startMove(e[0], 3 == t.which, !0),
                    this.dragMonitor.decision = "draw")
            }
            ,
            this.eventsCrosshairMove = function (t) { }
            ,
            this.onEndMove = function () {
                this.setCurrentCell(this.currentMove.endPoint, !0)
            }
            ,
            this.setCurrentCell = function (t, e) {
                this.currentCell = {
                    row: t.row,
                    col: t.col
                },
                    this.currentDomCell = this.dom.cells[t.row][t.col],
                    e || this.currentDomCell.focus()
            }
            ,
            this.focus = function () {
                "undefined" == typeof this.currentCell || "undefined" == typeof this.currentCell.row || "undefined" == typeof this.currentCell.col ? this[0].focus() : "undefined" != typeof this.dom.cells[this.currentCell.row] && this.dom.cells[this.currentCell.row][this.currentCell.col].focus()
            }
            ,
            this.keyboardSetState = function (t) {
                var e = this.getCurrentStatus(this.currentCell);
                this.keyMove = !0,
                    this.startMove(this.currentDomCell[0], !1, !0, e == t ? 0 : t),
                    this.drawing && (this.zoomingPanning = !1,
                        this.endMove(),
                        this.setCurrentCell({
                            row: this.currentCell.row,
                            col: this.currentCell.col
                        }))
            }
            ,
            this.initEventHandlers = function () {
                this.super.initEventHandlers(),
                    this.attr("tabindex", 1),
                    this.on("keydown", function (t) {
                        if (!$this.mouseDown) {
                            if ($this.keyMove = !1,
                                [37, 38, 39, 40, 65, 68, 83, 87].indexOf(t.keyCode) != -1) {
                                if (t.preventDefault(),
                                    $this.currentCell && "undefined" != typeof $this.currentCell.row && "undefined" != typeof $this.currentCell.col)
                                    switch (t.keyCode) {
                                        case 65:
                                        case 37:
                                            $this.currentCell.col > 0 && $this.setCurrentCell({
                                                row: $this.currentCell.row,
                                                col: $this.currentCell.col - 1
                                            });
                                            break;
                                        case 87:
                                        case 38:
                                            $this.currentCell.row > 0 && $this.setCurrentCell({
                                                row: $this.currentCell.row - 1,
                                                col: $this.currentCell.col
                                            });
                                            break;
                                        case 68:
                                        case 39:
                                            $this.currentCell.col < s.puzzleWidth - 1 && $this.setCurrentCell({
                                                row: $this.currentCell.row,
                                                col: $this.currentCell.col + 1
                                            });
                                            break;
                                        case 83:
                                        case 40:
                                            $this.currentCell.row < s.puzzleHeight - 1 && $this.setCurrentCell({
                                                row: $this.currentCell.row + 1,
                                                col: $this.currentCell.col
                                            })
                                    }
                                else
                                    $this.setCurrentCell({
                                        row: 0,
                                        col: 0
                                    });
                                $this.inputMode = "keyboard"
                            } else
                                90 == t.keyCode && t.ctrlKey ? $this.undo() : 89 == t.keyCode && t.ctrlKey ? $this.redo() : 32 == t.keyCode && "keyboard" == $this.inputMode ? (t.preventDefault(),
                                    $this.keyboardSetState()) : [48, 50, 88].indexOf(t.keyCode) != -1 && "keyboard" == $this.inputMode ? $this.keyboardSetState(1) : [49, 79, 90].indexOf(t.keyCode) != -1 && "keyboard" == $this.inputMode ? $this.keyboardSetState(2) : 17 == t.keyCode && "keyboard" == $this.inputMode ? ($this.keyMove = !0,
                                        $this.startMove($this.currentDomCell[0], !1, !1)) : 16 == t.keyCode && "keyboard" == $this.inputMode ? ($this.keyMove = !0,
                                            $this.startMove($this.currentDomCell[0], !0, !1)) : 27 == t.keyCode ? ($this.inputMode = "mouse",
                                                $this.focus()) : $this.cancelMove();
                            $this.toggleClass("kbd", "keyboard" == $this.inputMode)
                        }
                    }),
                    this.on("keyup", function (t) {
                        [16, 17].indexOf(t.keyCode) != -1 && $this.keyMove && $this.drawing && ($this.zoomingPanning = !1,
                            $this.endMove(),
                            $this.setCurrentCell({
                                row: $this.currentCell.row,
                                col: $this.currentCell.col
                            }))
                    }),
                    this.focus()
            }
            ,
            this.super = new puzzle(s),
            t.extend(Util.clone(this.super), this)
    }
}(jQuery);
