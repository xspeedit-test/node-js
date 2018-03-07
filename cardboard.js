class CardBoardService {

    /**
     * Gnerate list cardboard
     * @param  {string} chaine all lots
     * @return {string} list optimized cardboard
     */
    static generateListCardboard(chaine) {
        var optimizedChaine = '';
        if (chaine) {
            var listChaine = [];
            // split chaine to number list
            chaine.split('').forEach((lot) => {
                let number = Number(lot);
                if (!isNaN(number) && number) {
                    listChaine.push(number);
                }
            });
            // sort list asc
            listChaine = listChaine.sort();

            while(listChaine.length) {
                let lastLot = listChaine.pop();
                // get asc list number whose sum is <= 10
                let listLotFilter = listChaine.filter((lot) => 10 - lastLot >= lot);
                // get next cardboard
                optimizedChaine += this.findLotsInList(lastLot, listLotFilter, listChaine) + '/';
            }
            // remove last '/'
            optimizedChaine = optimizedChaine.substring(0, optimizedChaine.length - 2);
        }
        return optimizedChaine;
    }

    /**
     * Get optimized cardboard
     * @param  {number} max big lot
     * @param  {array} listLotFilter asc list number whose sum is <= 10
     * @param  {array} listChaine  list lot to put in cardboard
     * @return {string}  cardboard with lot
     */
    static findLotsInList(max, listLotFilter, listChaine) {
        let listLots = max;
        let sum = max;
        while(listLotFilter.length) {
            let lot = listLotFilter.pop();
            // return lot if cardboard is full
            if (sum + lot === 10) {
                sum = sum + lot;
                listLots = listLots + '' + lot;
                this.removeLotInList(lot, listChaine);
                break;
            }
            // add this lot in cardboard and search other lot
            else if (sum + lot < 10) {
                sum = sum + lot;
                this.removeLotInList(lot, listChaine);
                listLots = listLots + '' + lot;
            }
        }
        return listLots;
    }

    /**
     * Remove lot in list
     * @param  {number} lot
     * @param  {array} listChaine list lot to put in cardboard
     */
    static removeLotInList(lot, listChaine) {
        let index = listChaine.indexOf(lot);
        listChaine.splice(index, 1);
    }

}

module.exports = CardBoardService;
