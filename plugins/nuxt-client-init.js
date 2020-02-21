export default async (ctx) => {
    // console.log('ctx',ctx)
    await ctx.store.dispatch('nuxtClientInit', ctx)
}