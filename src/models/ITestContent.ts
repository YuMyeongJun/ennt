export interface IChoice {
  id: string;
  label: string;
}

export interface IQuestion {
  id: string;
  title: string;
  passage: string;
  choices: IChoice[];
  correctChoiceId: string;
  explanation: string;
}

export interface IQuestionSet {
  id: string;
  title: string;
  passage: string;
  explanation: string;
  questions: IQuestion[];
}

export interface ITestContent {
  questionSets: IQuestionSet[];
}
