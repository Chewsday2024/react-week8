






function shuffle ( arr ) {
  const shuffledarr = [...arr];

    for ( let i = shuffledarr.length - 1; i > 0; i-- ) {
      const randomNum = Math.floor(Math.random() * (i + 1));

      [shuffledarr[i], shuffledarr[randomNum]] = [shuffledarr[randomNum], shuffledarr[i]];
    }

    return shuffledarr;
};



export default shuffle;