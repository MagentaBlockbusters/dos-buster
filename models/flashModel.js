/* module.exports = class Flash{
    userIndex: int,
    userSeed: any,
    index: 0,
    security: any,
    depth: any,
    bundles: [],
    partialDigests: [],
    flash: {
      signersCount: any,
      balance: any,
      deposit: DEPOSITS.slice(), // Clone correctly
      outputs: {},
      transfers: []
        }
} */

    var method = Flash.prototype;
    
    function Flash(userIndex, userSeed, index, security,depth, bundles, partialDigests, flash) {
        this._userIndex = userIndex;
        this._userSeed = userSeed;
        this._index = index;
        this._security = security;
        this._depth = depth;
        this._bundles = bundles;
        this._partialDigests = partialDigests;
        this._flash = flash;
    }

    
    module.exports = Flash;