export const menuHeader =[
    {
        name: "user",
        menu: [
            {
                className: ['button_message'],
                name: "Tin nhắn",
                link: '#'
            }
        ]
    },
    {
        name: "sender",
        menu: [
            {
                className: ['button_message'],
                name: "Tin nhắn",
                link: '#'
            },
            {
                className : [],
                name: "Thông báo",
                link: '/notification/sender'
            }
        ]        
    },
    {
        name: "receiver",
        menu: [
            {
                className: ['button_message'],
                name: "Tin nhắn",
                link: '#'
            },
            {
                className : [],
                name: "Thông báo",
                link: '/notification/receiver'
            }
        ]        
    },
    {
        
        name: "car_trip",
        menu: [
            {
                className : [],
                name: "Quản lý giao dịch",
                link: '/car_trip/transaction_management'
            },
            {
                className : [
                    'btn__quantity_management'
                ],
                name: "Quản lý số lượng",
                link: '#'
            },
            {
                className: ['button_message'],
                name: "Tin nhắn",
                link: '#'
            }
        ]
    },
    {
        name: "admin",
        menu: [
        ]
    }
]
