export const menuHeader =[
    {
        name: "user",
        menu: []
    },
    {
        name: "sender",
        menu: [
            
            {
                name: "Thông báo",
                link: '/notification/sender'
            }
        ]        
    },
    {
        name: "receiver",
        menu: [
           
            {
                name: "Thông báo",
                link: '/notification/receiver'
            }
        ]        
    },
    {
        name: "car_trip",
        menu: [
            {
                name: "Quản lý giao dịch",
                link: '/car_trip/transaction_management'
            },
            {
                name: "Quản lý số lượng",
                link: '/car_trip/quantity_management'
            },
            // {
            //     name: "Thông báo",
            //     link: '/car_trip/notification'
            // }
        ]
    },
    {
        name: "admin",
        menu: [
        ]
    }
]
