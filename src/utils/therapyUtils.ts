import TherapyType from "@src/types/TherapyType";

export const getBasicTherapyList = (): TherapyType[] => {
  return [
    {
      name: "핫팩",
      duration: 600,
      elapsedTime: 0,
      isComplete: false,
    },
    {
      name: "ICT",
      duration: 600,
      elapsedTime: 0,
      isComplete: false,
    },
    {
      name: "부항",
      duration: 180,
      elapsedTime: 0,
      isComplete: false,
    },
    {
      name: "침",
      duration: 900,
      elapsedTime: 0,
      isComplete: false,
    },
  ];
};
