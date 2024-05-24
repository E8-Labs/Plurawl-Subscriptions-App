const Basepath = process.env.NEXT_PUBLIC_REACT_APP_ENVIRONMENT === "Development2" ? "https://bf59-119-156-82-235.ngrok-free.app" : "https://plurawlapp.com/plurawl"

const Apis = {
    AddnewCard : `${Basepath}/api/users/add_card`
}

export default Apis;