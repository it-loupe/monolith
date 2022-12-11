export const getTopicsFrequency = (topics: number[], threshold: number = 1 ) => {
  const topicFrequency = {};
  for (let i = 0; i < topics.length; ++i) {
    let name = topics[i]
    if (!topicFrequency[name])
      topicFrequency[name] = 0;
    ++topicFrequency[name];
  }

  return Object.entries(topicFrequency)
    .sort(([, v1], [, v2]) => Number(v2) - Number(v1))
    .reduce((obj, [k, v]) => {
      if (v > threshold) {
        return {
          ...obj,
          [k]: v
        }
      }
      return {...obj}
    }, {})
};
