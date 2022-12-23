export default class MultiChoicesQuestionOneAnswer {
  boxId!: string;
  quesId!: string;

  question: string = "";
  answer: string = "";

  choices: string[] = [];

  sOpt: string[] = this.choices;

  shuffleOpt(): string[] {
    let result: string[] = [];

    let tmpArr: string[];
    tmpArr = this.choices.slice();
    while (tmpArr.length > 0) {
      let idx = this.rnd(0, tmpArr.length - 1);
      result.push(tmpArr[idx]);
      tmpArr.splice(idx, 1);
    }
    this.sOpt = result;
    return result;
  }
  private rnd(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //如果在 define fields 的後面加上驚嘆號（!），
  //意思是我會自己負責這個 field 被初始化，請 TS 不要管
  testField!: string;
  // val: number;
  // next: ListNode | null;
  // constructor(val?: number, next?: ListNode | null) {
  //   this.val = val === undefined ? 0 : val;
  //   this.next = next === undefined ? null : next;
  // }
}
