import s from "../styles/Fine.module.css";
import {FineType} from "../pages";

type FinePropsType = {
    fines: Array<FineType>
}
export const Fine = (props: FinePropsType) => {
    const {fines} = props

    return <div>
        {fines.length && fines.map(i => {
            return <>
                <div className={s.fine}>
                    <span> Постановление #{i.number}</span>
                    <div className={s.list}>
                        <div className={s.listItem}>
                            <div> Свидетельство о регистрации: </div><div>{i.doc_number}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>Дата постановления: </div><div>{i.bill_at}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>Нарушение: </div><div>{i.koap_code}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>Получатель платежа: </div><div>{i.payee_username}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>ИНН: </div><div>{i.payee_inn}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>КПП: </div><div>{i.payee_kpp}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>Расчетный счет: </div><div>{i.payee_bank_account}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>Банк получателя: </div> <div>{i.payee_bank_name}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>БИК: </div><div>{i.payee_bank_bik}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>ОКТМО(ОКАТО): </div> <div>{i.payee_oktmo}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>КБК: </div> <div>{i.kbk}</div>
                        </div>
                        <div className={s.listItem}>
                            <div>Сумма штафа: </div> <div>{i.amount}</div>
                        </div>

                        {i.discount_at &&
                        <div className={s.listItem}>
                            <div>Скидка: </div><div>{i.discount_at}</div>
                        </div>
                        }
                        <div className={s.listItem}>
                            <div>К оплате: </div> <div>{i.amount_to_pay}</div>
                        </div>
                    </div>
                </div>
            </>
        })}
    </div>
}