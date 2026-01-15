import { GameCard } from "@src/typings/cards";

export function createGameCards(
    uniqueCards: { value: number; image: string }[]
): GameCard[] {
    const cards: GameCard[] = [];

    uniqueCards.forEach((card) => {
        cards.push(
            {
                value: card.value,
                image: card.image,
                isMatched: false,
            },
            {
                value: card.value,
                image: card.image,
                isMatched: false,
            }
        );
    });

    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
}
