import { sentiment } from 'sentiment';

module.exports.returnUserId = (event) => {
    const note = event.Records[0].Sns.Message;
    const result = sentiment(note);
    console.log("🚀 ~ file: returnUserId.ts ~ line 6 ~ result", result)
    
}