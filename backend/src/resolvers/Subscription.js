const Subscription={
    newme:{
        subscribe:(parent,{email},{pubsub})=>{
            return pubsub.subscribe(`me ${email}`);
        }
    }
}
export default Subscription; 