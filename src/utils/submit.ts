export function replaceAnswer(answer: string) {
    //@ts-ignore
    if (document && $) {
        $('#puzzleForm').attr('onsubmit', `console.log('customer onsubmit');
        Game.saveState();
        Game.tickTimer();
        this.jstimerPersonal.value = Game.getTimer();
        this.ansH.value = '${answer}';`);

        $("#btnReady").off("click"); //卸载post提交答案方法，绕过Game组件逻辑

        window.useRobot && $("#robot").attr("value", "1"); //设置robot参数，可通过配置控制
    }
}

export function submitAnswer() {
    (document.querySelector('#btnReady') as HTMLButtonElement | undefined)?.click();
}