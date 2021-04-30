const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()


const bot = new Telegraf(process.env.TOKEN)


function generateResult(numbers) {
    var results = []
    results.push({
        type: 'article',
        id: 1,
        title: 'Qo\'shish',
        thumb_url: "https://image.flaticon.com/icons/png/512/2/2119.png",
        description: numbers[0] + " + " + numbers[1],
        input_message_content: {
            message_text: Number(numbers[0]) + Number(numbers[1]),
            parse_mode: 'markdown'
        }
    })
    results.push({
        type: 'article',
        id: 2,
        title: 'Ayrish',
        thumb_url: "https://image.flaticon.com/icons/png/512/2801/2801932.png",
        description: numbers[0] + " - " + numbers[1],
        input_message_content: {
            message_text: Number(numbers[0]) - Number(numbers[1]),
            parse_mode: 'markdown'
        }
    })
    results.push({
        type: 'article',
        id: 3,
        title: 'Ko\'paytirish',
        thumb_url: "https://image.flaticon.com/icons/png/512/2/2194.png",
        description: numbers[0] + " * " + numbers[1],
        input_message_content: {
            message_text: Number(numbers[0]) * Number(numbers[1]),
            parse_mode: 'markdown'
        }
    })
    if (numbers[1] == 0) results.push({
        type: 'article',
        id: 4,
        title: 'Xatolik',
        thumb_url: "https://e7.pngegg.com/pngimages/956/849/png-clipart-scalable-graphics-computer-icons-illustration-mac-os-9-error-trademark-logo.png",
        description: "0 ga bo'lib bo'lmaydi",
        input_message_content: {
            message_text: "Maktabda to'p tepib yurmay o'qish kerak edi..",
            parse_mode: 'markdown'
        }
    })
    else results.push({
        type: 'article',
        id: 4,
        title: 'Bo\'lish',
        thumb_url: "https://img.icons8.com/material/452/divide--v1.png",
        description: numbers[0] + " / " + numbers[1],
        input_message_content: {
            message_text: Number(numbers[0]) / Number(numbers[1]),
            parse_mode: 'markdown'
        }
    })

    return results
}


bot.start(ctx => {
    const message = "Assalomu alaykum, ushbu bot sizga 2 ta son ustida oddiy arifmetik amallarni bajarishga yordam beradi. Botni ishlatib ko'rish uchun pastdagi tugmani bosib bironta chatni tanlang"
    ctx.reply(message, Markup.inlineKeyboard([
        Markup.urlButton('Kanal', 'https://t.me/Makkapoya'),
        Markup.switchToChatButton('Sinab ko\'rish', '2 2')
    ]).extra()).catch(() => { })
})



bot.on('inline_query', ctx => {

    try {
        const numbers = ctx.inlineQuery.query.split(' ')
        if (numbers.length != 2) {
            ctx.answerInlineQuery([
                {
                    type: 'article',
                    id: 1,
                    title: 'Xatolik',
                    thumb_url: 'https://e7.pngegg.com/pngimages/956/849/png-clipart-scalable-graphics-computer-icons-illustration-mac-os-9-error-trademark-logo.png',
                    description: "Misol kiritishni o\'rganish",
                    input_message_content: {
                        message_text: "Arifmetik amalni bajarish uchun 2 ta sonni bo'sh joy tashlab yozing.\nMisol uchun: `2 2`",
                        parse_mode: 'markdown'
                    }
                }]).catch(err => { })
            return null
        }

        const results = generateResult(numbers)
        ctx.answerInlineQuery(results).catch(err => { })

    } catch (err) {
        ctx.answerInlineQuery([
            {
                type: 'article',
                id: 1,
                title: 'Xatolik',
                thumb_url: 'https://e7.pngegg.com/pngimages/956/849/png-clipart-scalable-graphics-computer-icons-illustration-mac-os-9-error-trademark-logo.png',
                description: "Misol kiritishni o\'rganish",
                input_message_content: {
                    message_text: "Arifmetik amalni bajarish uchun 2 ta sonni bo'sh joy tashlab yozing.\nMisol uchun: `2 2`",
                    parse_mode: 'markdown'
                }
            }]).catch(err => { })
        return null
    }
})

bot.catch(err => { })

bot.launch()