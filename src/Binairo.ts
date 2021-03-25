import parseTask from './utils/parsetask';
import { replaceAnswer, submitAnswer } from './utils/submit';
import { registerWorkerWithBlob } from './utils/worker';
import { BlockTypeEnum, InitBlock, Position } from './types/block';
import { State, BlockStatus } from './types/state';

const mockTask = false; //mock调试模式
const mockData = {
    taskKey: "b0c0h1a1b1a11b11e0d1a1c0e11a0e0d01b00a00c1k0f1l1c0a1a0b00a0g0a0b01d1e1d1e1d0e1k0a1g1d00b0a1c11a11d1a00a0c1n1c1b0b11b11c1e00a0e0k0c11a1c0e1e1i11b1a0c0b0b1h0b1i11d1a1a1c0g0b1a00f0d1b0b0e0b11d1a1b1e00c1b1g1e0b0h0j1a00f0c1c11a0b0a0a1f0a0c1d1d0c01c0a1b01c1d1g1a0c1g0g1a11a1f1d1a1d1m1g0f0b0a0a1e11b1c1b1a1i0c1a00b0b0b1g1i1f1c0a01c1e01f0b1b0a0e11a00a0e0e0q00c1d0a0i1c00d1a1c00h1a0c1d1k0b1b0d1e1b0a00a0c1c0a10a0c11b",
    puzzleSize: 30,
};

try {
    window.useRobot = true; //默认启用robot
} catch (e) { }


type QueueType = Set<string>;


export default class Binairo {
    graph: InitBlock[][];
    puzzleSize: number;
    answer?: string;
    constructor(graph: InitBlock[][], puzzleSize: number) {
        this.graph = graph;
        this.puzzleSize = puzzleSize;
    }
    getBlockType = (block: InitBlock): BlockTypeEnum => {
        return {
            [-1]: BlockTypeEnum.Space,
            0: BlockTypeEnum.White,
            1: BlockTypeEnum.Black,
        }[block];
    }
    cloneState = function <T extends Object>(arr: T[][]) { //深拷贝二维对象数组
        return arr.map(a => a.map(b => JSON.parse(JSON.stringify(b))));
    }
    checkBoundary = (p: Position): boolean => {
        return !(p.x < 0 || p.x >= this.graph.length || p.y < 0 || p.y >= this.graph[0].length);
    }
    clonePosition = (p: Position): Position => ({ ...p });
    leftPosition = (p: Position): Position => ({ x: p.x, y: p.y - 1 });
    rightPosition = (p: Position): Position => ({ x: p.x, y: p.y + 1 });
    topPosition = (p: Position): Position => ({ x: p.x - 1, y: p.y });
    bottomPosition = (p: Position): Position => ({ x: p.x + 1, y: p.y });

    initState = (graph: InitBlock[][]) => {
        let blockState: BlockStatus[][] = graph.map(list => list.map(p => (this.getBlockType(p))));
        return { blockState };
    }

    //当前状态下，p点的status状态是否可行
    available = (data: State, p: Position, status: BlockStatus, verificateMode: boolean = false): boolean => {
        const { blockState } = data, { x, y } = p;
        if (blockState[x][y] !== BlockTypeEnum.Space && blockState[x][y] !== status) { return false; }
        if (!verificateMode) {
            const plineRest = blockState[x].length / 2 - blockState[x].filter(i => i === status).length;
            if (plineRest <= 0) { return false; }
            const pcolumnRest = blockState[y].length / 2 - blockState.slice().map(arr => arr[y]).filter(i => i === status).length;
            if (pcolumnRest <= 0) { return false; }
        }
        const same = (p: any, ...rest: any[]) => {
            return rest.every(i => i === p);
        }
        if (this.checkBoundary({ x: x + 2, y })) {
            if (same(status, blockState[x + 1][y], blockState[x + 2][y])) { return false; }
        }
        if (this.checkBoundary({ x: x - 1, y }) && this.checkBoundary({ x: x + 1, y })) {
            if (same(status, blockState[x - 1][y], blockState[x + 1][y])) { return false; }
        }
        if (this.checkBoundary({ x: x - 2, y })) {
            if (same(status, blockState[x - 2][y], blockState[x - 1][y])) { return false; }
        }
        if (this.checkBoundary({ x, y: y + 2 })) {
            if (same(status, blockState[x][y + 1], blockState[x][y + 2])) { return false; }
        }
        if (this.checkBoundary({ x, y: y - 1 }) && this, this.checkBoundary({ x, y: y + 1 })) {
            if (same(status, blockState[x][y - 1], blockState[x][y + 1])) { return false; }
        }
        if (this.checkBoundary({ x, y: y - 2 })) {
            if (same(status, blockState[x][y - 2], blockState[x][y - 1])) { return false; }
        }
        return true;
    }
    //返回任意位置周围四个位置，满足applyCondition条件的位置
    aroundTRBL(p: Position, applyCondition: (p: Position) => boolean = () => (true)): Partial<[Position, Position, Position, Position]> {
        let result = [undefined, undefined, undefined, undefined] as Partial<[Position, Position, Position, Position]>;
        const top = this.topPosition(p);
        if (applyCondition(this.clonePosition(top))) { result[0] = top; }
        const right = this.rightPosition(p);
        if (applyCondition(this.clonePosition(right))) { result[1] = right; }
        const bottom = this.bottomPosition(p);
        if (applyCondition(this.clonePosition(bottom))) { result[2] = bottom; }
        const left = this.leftPosition(p);
        if (applyCondition(this.clonePosition(left))) { result[3] = left; }
        return result;
    }
    //返回四周的边界内区域
    availbleSpace(p: Position): Partial<[Position, Position, Position, Position]> {
        if (!this.checkBoundary(p)) { console.log('//对边界外区域执行了restSpace动作'); return [undefined, undefined, undefined, undefined]; } //判断边界

        const condition = (px: Position): boolean => {
            return this.checkBoundary(px)
        }
        return this.aroundTRBL(p, condition);
    }
    //返回四周的空白区域
    restSpace(data: State, p: Position): Partial<[Position, Position, Position, Position]> {
        if (!this.checkBoundary(p)) { console.log('//对边界外区域执行了restSpace动作'); return [undefined, undefined, undefined, undefined]; } //判断边界

        const condition = (px: Position): boolean => {
            return this.checkBoundary(px) && data.blockState[px.x][px.y] === BlockTypeEnum.Space
        }
        return this.aroundTRBL(p, condition);
    }

    appendToUpdateQueue(data: State, queue: QueueType, points: Position[]): boolean { //将p插入等待队列
        for (let { x, y } of points) {
            const queueKey = `${x},${y}`;
            //忽略边界外点
            if (!this.checkBoundary({ x, y })) { continue; }
            //去重
            if (queue.has(queueKey)) { continue; }
            //校验位置是否完成
            if (data.blockState[x][y] !== BlockTypeEnum.Space) { continue; }
            //添加到队列
            queue.add(queueKey);
        }
        return true;
    }
    clearUpdateQueue(data: State, queue: QueueType): boolean { //清空等待队列
        let count = 0;
        try {
            while (queue.size > 0) {
                const pos = [...queue.keys()][0];
                queue.delete(pos);
                console.log('clear queue', count++, pos);

                const [x, y] = pos.split(',').map(i => +i);
                if (!this.updatePoint(data, queue, this.clonePosition({ x, y }))) {
                    return false;
                }
            }
        } catch (err) {
            console.error('clear queue error', err);
            return false;
        }
        return true;
    }

    updateAllPoints = (data: State): boolean => {
        let queue = new Set<string>();
        for (let x = 0; x < this.graph.length; x++) {
            for (let y = 0; y < this.graph[0].length; y++) {
                this.updatePoint(data, queue, { x, y });
            }
        }
        return this.clearUpdateQueue(data, queue);
    }
    addPointToQueue = (data: State, queue: QueueType, p: Position): boolean => {
        return this.appendToUpdateQueue(data, queue,
            this.availbleSpace(p).filter(i => i).map(i => {
                if (i) {
                    if (data.blockState[i.x][i.y] === BlockTypeEnum.Space) {
                        return i;
                    } else {
                        return this.restSpace(data, i).filter(i => i);
                    }
                }
                return i;
            }).flat() as Position[]);
    }
    updatePoint = (data: State, queue: QueueType, p: Position): boolean => {
        const { blockState } = data, { x, y } = p;
        if (blockState[x][y] !== BlockTypeEnum.Space) { return true; }
        if (!this.available(data, p, BlockTypeEnum.Black)) {
            blockState[x][y] = BlockTypeEnum.White;
            this.addPointToQueue(data, queue, p);
        } else if (!this.available(data, p, BlockTypeEnum.White)) {
            blockState[x][y] = BlockTypeEnum.Black;
            this.addPointToQueue(data, queue, p);
        }
        return true;
    }

    solvelc = (arr: BlockStatus[]): BlockStatus[] => {
        const action = (status: BlockStatus): BlockStatus[] | false => {
            const oppositeStatus = {
                [BlockTypeEnum.Black]: BlockTypeEnum.White,
                [BlockTypeEnum.White]: BlockTypeEnum.Black,
                [BlockTypeEnum.Space]: BlockTypeEnum.Space,
            }[status];
            const pRest = arr.length / 2 - arr.filter(i => i === status).length;
            if (pRest === 0) {
                return arr.slice().map(i => i === BlockTypeEnum.Space ? oppositeStatus : i);
            } else if (pRest < 0) {
                throw `pRest<0`;
            }

            //对于每个边缘白棋，或三个以上的连续空白位置，解析出若干个黑棋存在区间
            const inBoundary = (i: number) => (0 <= i && i < arr.length);
            const isSpace = (i: number) => (arr[i] === BlockTypeEnum.Space);
            let sRanges = [], lRanges = []; //{s:number,e:number}
            for (let [index, p] of arr.entries()) {
                if (p === oppositeStatus) {
                    if (inBoundary(index - 2) && isSpace(index - 2) && isSpace(index - 1)) {
                        sRanges.push({ s: index - 2, e: index - 1 });
                    }
                    if (inBoundary(index - 1) && inBoundary(index + 1) && isSpace(index - 1) && isSpace(index + 1)) {
                        sRanges.push({ s: index - 1, e: index + 1 });
                    }
                    if (inBoundary(index + 2) && isSpace(index + 1) && isSpace(index + 2)) {
                        sRanges.push({ s: index + 1, e: index + 2 });
                    }
                } else if (p === BlockTypeEnum.Space) {
                    if (inBoundary(index - 1) && inBoundary(index + 1) && isSpace(index - 1) && isSpace(index + 1)) {
                        lRanges.push({ s: index - 1, e: index + 1 });
                    }
                }
            }
            sRanges.sort((a, b) => (a.s - b.s));
            lRanges.sort((a, b) => (a.s - b.s));
            //对区间做贪心操作，计算出所有区间所需要的最小黑棋数量，以及对应的子区间
            //  （计算多个区间中，不重叠的区间的最大数量）
            //      且找到该数量下的最小区间涵盖
            //      考虑先遍历计算长度为2的区间，在此结论上再计算长度为3的区间。可直接得到结论
            //  （区间长度为2或3，故可用贪心算法）
            let maxRanges = [], curE = -1;
            for (let { s, e } of sRanges.values()) {
                if (s > curE) {
                    maxRanges.push({ s, e });
                    curE = e;
                }
            }
            let filledMap = new Set<number>(maxRanges.map(({ s, e }) => [...Array(e - s + 1).keys()].map(i => i + s)).flat());
            for (let { s, e } of lRanges.values()) {
                if (!filledMap.has(s) && !filledMap.has(e)) {
                    maxRanges.push({ s, e });
                    [...Array(e - s + 1).keys()]
                        .map(i => i + s)
                        .map(i => filledMap.add(i));
                }
            }

            //若数量等于该行黑棋剩余数量，则对行内所有不在子区间内的空白位置填上白棋
            if (maxRanges.length === pRest) {
                return arr.slice().map((v, i) => v === BlockTypeEnum.Space && !filledMap.has(i) ? oppositeStatus : v);
            }
            return false;
        }

        return action(BlockTypeEnum.Black) || action(BlockTypeEnum.White) || arr.slice();
    }
    updateLine = (data: State, queue: QueueType, l: number): boolean => {
        const line = data.blockState[l].slice();
        const nextLine = this.solvelc(line);
        for (let [index, item] of data.blockState[l].entries()) {
            if (item === BlockTypeEnum.Space) {
                data.blockState[l][index] = nextLine[index];
                this.addPointToQueue(data, queue, { x: l, y: index });
            } else if (item !== nextLine[index]) {
                console.error(`item:${item} index:${index} nextLine[index]:${nextLine[index]}`);
                return false;
            }
        }
        return true;
    }
    updateColumn = (data: State, queue: QueueType, c: number): boolean => {
        const column = data.blockState.slice().map(i => i[c]);
        const nextColumn = this.solvelc(column);
        for (let [index, arr] of data.blockState.entries()) {
            const item = arr[c];
            if (item === BlockTypeEnum.Space) {
                data.blockState[index][c] = nextColumn[index];
                this.addPointToQueue(data, queue, { x: index, y: c });
            } else if (item !== nextColumn[index]) {
                console.error(`item:${item} index:${index} nextColumn[index]:${nextColumn[index]}`);
                return false;
            }
        }
        return true;
    }
    //尝试更新行/列
    //（待定）附加逻辑：有任意行更新，则不再对列做处理，并返回true；否则对列尝试更新
    updateLines = (data: State): boolean => {
        let queue = new Set<string>();
        for (let l = 0; l < this.graph.length; l++) {
            if (!this.updateLine(data, queue, l)) { return false; }
        }
        for (let c = 0; c < this.graph[0].length; c++) {
            if (!this.updateColumn(data, queue, c)) { return false; }
        }
        return this.clearUpdateQueue(data, queue);
    }

    loop = (data: State): State | false => {
        //暂不存在需要递归尝试的情况
        let cnt = 0;
        do {
            console.log(`loop times: ${++cnt}`)
            if (this.verificate(data)) { return data; }
            if (!this.updateLines(data)) { break; }

            if (cnt > 100) { break; } //避免死循环
        } while (1);

        return false;
    }
    solve = (): string => {
        //初始化所有点
        let result: State | false = this.initState(this.graph);
        //做全图推导
        this.updateAllPoints(result);

        if (!this.verificate(result)) {
            result = this.loop({
                blockState: this.cloneState(result.blockState),
            });
        }

        return (this.answer = (result ? this.generaterAnawer(result.blockState) : 'failed'));
    }
    verificate(data: State): boolean {
        const { blockState } = data;
        for (let x = 0; x < blockState.length; x++) {
            for (let y = 0; y < blockState[0].length; y++) {
                if (blockState[x][y] === BlockTypeEnum.Space) { return false; }
                //检查是否存在连续三块相同
                if (!this.available(data, { x, y }, blockState[x][y], true)) { return false; }
            }
        }
        return true;
    }
    generaterAnawer = (blockState: State['blockState']): string => {
        return blockState.map(arr => arr.map(item => ({
            [BlockTypeEnum.Black]: 1,
            [BlockTypeEnum.White]: 0,
            [BlockTypeEnum.Space]: 'n',
        }[item])).join('')).join('');
    }
}

(() => {
    console.log('start');
    if (mockTask) {
        const { puzzleSize, taskKey } = mockData;
        const tasks = parseTask(taskKey, puzzleSize);
        console.info('task', taskKey, tasks);

        const binairo = new Binairo(tasks, puzzleSize);
        const timer1 = new Date;
        const answer = binairo.solve();
        const timer2 = new Date;
        console.info('answer', answer);
        console.info('耗时', timer2.valueOf() - timer1.valueOf(), 'ms');
        return;
    }

    const onmessage = (e: MessageEvent) => {
        const { tasks, puzzleSize } = JSON.parse(e.data);
        const pipe = new Binairo(tasks, puzzleSize);
        const answer = pipe.solve();
        (postMessage as any)(answer);
    }
    //此处采用hack写法，需要写进所有依赖函数
    const scriptStr = `
        ${Binairo.toString()} 
        onmessage=${onmessage.toString()}
    `;

    const taskKey: string = task;
    const tasks = Game.task;
    console.info('task', taskKey, tasks);
    const timer1 = new Date;
    registerWorkerWithBlob({
        scriptStr,
        postMessageStr: JSON.stringify({ tasks, puzzleSize: 0 }),
        onMessage: (e: MessageEvent<string>) => {
            const timer2 = new Date;
            const answer = e.data;
            console.info('answer', answer);
            console.info('耗时', timer2.valueOf() - timer1.valueOf(), 'ms');
            replaceAnswer(answer);
            window.submit = submitAnswer;
            window.useRobot && submitAnswer();
        }
    });

})()


declare global {
    interface Window {
        submit: any;
        useRobot: boolean;
    }
}