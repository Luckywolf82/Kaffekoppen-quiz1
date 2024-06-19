const db = require('../models');
const Users = db.users;

const Answers = db.answers;

const Images = db.images;

const Payments = db.payments;

const Questions = db.questions;

const Quizzes = db.quizzes;

const Organizations = db.organizations;

const AnswersData = [
  {
    answer_text: 'Paris',

    is_correct: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    answer_text: 'London',

    is_correct: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    answer_text: 'Berlin',

    is_correct: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    answer_text: 'Madrid',

    is_correct: false,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    answer_text: 'Alexander Fleming',

    is_correct: true,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ImagesData = [
  {
    title: 'Eiffel Tower',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Penicillin Mold',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'World War II',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Jupiter',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'FIFA World Cup 2018',

    // type code here for "images" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const PaymentsData = [
  {
    gateway: 'Stripe',

    amount: 49.99,

    date: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    gateway: 'PayPal',

    amount: 29.99,

    date: new Date('2023-10-02T11:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    gateway: 'Klarna',

    amount: 19.99,

    date: new Date('2023-10-03T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    gateway: 'Stripe',

    amount: 39.99,

    date: new Date('2023-10-04T13:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    gateway: 'PayPal',

    amount: 59.99,

    date: new Date('2023-10-05T14:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const QuestionsData = [
  {
    question_text: 'What is the capital of France?',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    question_text: 'Who discovered penicillin?',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    question_text: 'When did World War II end?',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    question_text: 'What is the largest planet in our solar system?',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    question_text: 'Which country won the FIFA World Cup in 2018?',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const QuizzesData = [
  {
    title: 'General Knowledge Quiz',

    description: 'A quiz to test your general knowledge.',

    difficulty: 'hard',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'History Quiz',

    description: 'A quiz about historical events.',

    difficulty: 'easy',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Science Quiz',

    description: 'A quiz to test your science knowledge.',

    difficulty: 'easy',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Geography Quiz',

    description: 'A quiz about world geography.',

    difficulty: 'hard',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    title: 'Sports Quiz',

    description: 'A quiz about various sports.',

    difficulty: 'medium',

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Kaffekoppen Café',
  },

  {
    name: 'Quiz Masters Inc.',
  },

  {
    name: 'Trivia Experts',
  },

  {
    name: 'Knowledge Seekers',
  },

  {
    name: 'Brainiacs',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setOrganization) {
    await User4.setOrganization(relatedOrganization4);
  }
}

async function associateAnswerWithQuestion() {
  const relatedQuestion0 = await Questions.findOne({
    offset: Math.floor(Math.random() * (await Questions.count())),
  });
  const Answer0 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Answer0?.setQuestion) {
    await Answer0.setQuestion(relatedQuestion0);
  }

  const relatedQuestion1 = await Questions.findOne({
    offset: Math.floor(Math.random() * (await Questions.count())),
  });
  const Answer1 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Answer1?.setQuestion) {
    await Answer1.setQuestion(relatedQuestion1);
  }

  const relatedQuestion2 = await Questions.findOne({
    offset: Math.floor(Math.random() * (await Questions.count())),
  });
  const Answer2 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Answer2?.setQuestion) {
    await Answer2.setQuestion(relatedQuestion2);
  }

  const relatedQuestion3 = await Questions.findOne({
    offset: Math.floor(Math.random() * (await Questions.count())),
  });
  const Answer3 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Answer3?.setQuestion) {
    await Answer3.setQuestion(relatedQuestion3);
  }

  const relatedQuestion4 = await Questions.findOne({
    offset: Math.floor(Math.random() * (await Questions.count())),
  });
  const Answer4 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Answer4?.setQuestion) {
    await Answer4.setQuestion(relatedQuestion4);
  }
}

async function associateAnswerWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Answer0 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Answer0?.setOrganization) {
    await Answer0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Answer1 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Answer1?.setOrganization) {
    await Answer1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Answer2 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Answer2?.setOrganization) {
    await Answer2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Answer3 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Answer3?.setOrganization) {
    await Answer3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Answer4 = await Answers.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Answer4?.setOrganization) {
    await Answer4.setOrganization(relatedOrganization4);
  }
}

async function associateImageWithUploaded_by() {
  const relatedUploaded_by0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setUploaded_by) {
    await Image0.setUploaded_by(relatedUploaded_by0);
  }

  const relatedUploaded_by1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setUploaded_by) {
    await Image1.setUploaded_by(relatedUploaded_by1);
  }

  const relatedUploaded_by2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setUploaded_by) {
    await Image2.setUploaded_by(relatedUploaded_by2);
  }

  const relatedUploaded_by3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setUploaded_by) {
    await Image3.setUploaded_by(relatedUploaded_by3);
  }

  const relatedUploaded_by4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Image4 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Image4?.setUploaded_by) {
    await Image4.setUploaded_by(relatedUploaded_by4);
  }
}

async function associateImageWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Image0 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Image0?.setOrganization) {
    await Image0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Image1 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Image1?.setOrganization) {
    await Image1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Image2 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Image2?.setOrganization) {
    await Image2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Image3 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Image3?.setOrganization) {
    await Image3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Image4 = await Images.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Image4?.setOrganization) {
    await Image4.setOrganization(relatedOrganization4);
  }
}

async function associatePaymentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setUser) {
    await Payment0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setUser) {
    await Payment1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setUser) {
    await Payment2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment3 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Payment3?.setUser) {
    await Payment3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment4 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Payment4?.setUser) {
    await Payment4.setUser(relatedUser4);
  }
}

async function associatePaymentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setOrganization) {
    await Payment0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setOrganization) {
    await Payment1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setOrganization) {
    await Payment2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment3 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Payment3?.setOrganization) {
    await Payment3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment4 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Payment4?.setOrganization) {
    await Payment4.setOrganization(relatedOrganization4);
  }
}

async function associateQuestionWithQuiz() {
  const relatedQuiz0 = await Quizzes.findOne({
    offset: Math.floor(Math.random() * (await Quizzes.count())),
  });
  const Question0 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Question0?.setQuiz) {
    await Question0.setQuiz(relatedQuiz0);
  }

  const relatedQuiz1 = await Quizzes.findOne({
    offset: Math.floor(Math.random() * (await Quizzes.count())),
  });
  const Question1 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Question1?.setQuiz) {
    await Question1.setQuiz(relatedQuiz1);
  }

  const relatedQuiz2 = await Quizzes.findOne({
    offset: Math.floor(Math.random() * (await Quizzes.count())),
  });
  const Question2 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Question2?.setQuiz) {
    await Question2.setQuiz(relatedQuiz2);
  }

  const relatedQuiz3 = await Quizzes.findOne({
    offset: Math.floor(Math.random() * (await Quizzes.count())),
  });
  const Question3 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Question3?.setQuiz) {
    await Question3.setQuiz(relatedQuiz3);
  }

  const relatedQuiz4 = await Quizzes.findOne({
    offset: Math.floor(Math.random() * (await Quizzes.count())),
  });
  const Question4 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Question4?.setQuiz) {
    await Question4.setQuiz(relatedQuiz4);
  }
}

// Similar logic for "relation_many"

async function associateQuestionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Question0 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Question0?.setOrganization) {
    await Question0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Question1 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Question1?.setOrganization) {
    await Question1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Question2 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Question2?.setOrganization) {
    await Question2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Question3 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Question3?.setOrganization) {
    await Question3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Question4 = await Questions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Question4?.setOrganization) {
    await Question4.setOrganization(relatedOrganization4);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateQuizWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Quiz0 = await Quizzes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Quiz0?.setOrganization) {
    await Quiz0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Quiz1 = await Quizzes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Quiz1?.setOrganization) {
    await Quiz1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Quiz2 = await Quizzes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Quiz2?.setOrganization) {
    await Quiz2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Quiz3 = await Quizzes.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Quiz3?.setOrganization) {
    await Quiz3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Quiz4 = await Quizzes.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Quiz4?.setOrganization) {
    await Quiz4.setOrganization(relatedOrganization4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Answers.bulkCreate(AnswersData);

    await Images.bulkCreate(ImagesData);

    await Payments.bulkCreate(PaymentsData);

    await Questions.bulkCreate(QuestionsData);

    await Quizzes.bulkCreate(QuizzesData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateAnswerWithQuestion(),

      await associateAnswerWithOrganization(),

      await associateImageWithUploaded_by(),

      await associateImageWithOrganization(),

      await associatePaymentWithUser(),

      await associatePaymentWithOrganization(),

      await associateQuestionWithQuiz(),

      // Similar logic for "relation_many"

      await associateQuestionWithOrganization(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateQuizWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('answers', null, {});

    await queryInterface.bulkDelete('images', null, {});

    await queryInterface.bulkDelete('payments', null, {});

    await queryInterface.bulkDelete('questions', null, {});

    await queryInterface.bulkDelete('quizzes', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
