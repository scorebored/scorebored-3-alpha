export const otherPlayer = (player) => {
    if (player === "player0") {
        return "player1";
    }
    if (player === "player1") {
        return "player0";
    }
    throw new Error("invalid player: " + player);
};

