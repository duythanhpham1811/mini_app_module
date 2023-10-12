export interface IData {
    event_message: string;
    data?: any;
}


export interface BaseApiConfig {
    refreshToken?: string;
    baseUrl?: string;
}

export interface IModule {
    module: string,
    client_id?: string,
    secret_id?:string;
    config?: any;
    type: string;
    refresh_token ?: string;
    is_vinid_user : boolean;
    is_required_login ?:boolean;
    is_logout_sso ?:any;
    device_id ?: string;
    module_id ?: string;
    web_host ?: any;
}
