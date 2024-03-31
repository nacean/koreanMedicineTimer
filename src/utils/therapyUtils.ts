import TherapyType from "@src/types/TherapyType";

export const getBasicTherapyList = (): TherapyType[] => {
  return [
    {
      name: "핫팩",
      duration: 600,
      remainTime: 600,
      isComplete: false,
    },
    {
      name: "ICT",
      duration: 600,
      remainTime: 600,
      isComplete: false,
    },
    {
      name: "부항",
      duration: 180,
      remainTime: 180,
      isComplete: false,
    },
    {
      name: "침",
      duration: 900,
      remainTime: 900,
      isComplete: false,
    },
  ];
};
