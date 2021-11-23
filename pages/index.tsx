import type { NextPage } from 'next'
import Head from 'next/head'
import s from '../styles/Search.module.css'
import {ChangeEvent, useEffect, useState} from "react";
import {API} from "./api/api";
import { Fine } from '../components/Fine';
import {Preloader} from "../components/Preloader";


export type FineType = {
    "number":string,
    "bill_at": string,
    "amount": string,
    "amount_to_pay":string,
    "discount_at": null,
    "discount_size": null,
    "payment_status": string,
    "quittance": string,
    "pay_status":string,
    "is_revoked": null,
    "name": string,
    "koap_code": null,
    "koap_text": null,
    "location": null,
    "doc_type": string,
    "doc_number": string,
    "reg_cert": null,
    "violation_at": null,
    "violator_name": string,
    "division_name": string,
    "division_code": null,
    "fssp_ip": null,
    "fssp_uin": null,
    "payee_username": string,
    "payee_inn": string,
    "payee_kpp": string,
    "payee_oktmo": string,
    "payee_bank_name": string,
    "payee_bank_bik": string,
    "payee_bank_account": string,
    kbk: string,
    docs: [],
    pics: [],
    is_cached: boolean
}

const Search: NextPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'fail'>('idle')
  const [state, setState] = useState<{ fines: FineType [] }>({fines:[]})


  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
      setCode('');
      let value = e.currentTarget.value;
      if (!isFinite(+value)) return;
      setInputValue(value)
      setStatus('idle')
  }
  useEffect(() => {
        if(inputValue.length === 19 || inputValue.length === 24){
            count(inputValue)
        }
    }, [inputValue])

  const onClick = async () => {
      setStatus('loading')
    try {
      const res = await API.getFine(inputValue)
      if (res.status === 200) {
        setState({...state, fines: [res.data]})
          setStatus('success')
      } else {
          setStatus('fail')
      }
    } catch (e) {
       console.log(e)
        setStatus('fail')
    }
  }
  const count = (num:string) => {
        let arr = num.split('').map(n => +n)

        let mult = 1
        let amount = 0
        for(let i=0; i < arr.length; i++){
            if(mult === 11 || mult === 21){
                mult = 1
            }
            amount += arr[i] * mult
            mult++
        }

        let res = amount % 11
        if(res <= 9) return setCode(inputValue+res);


        mult = 3
        amount = 0
        for(let i=0; i < arr.length; i++){
            if(mult === 11 || mult === 21){
                mult = 1
            }
            amount += arr[i] * mult
            mult++
        }

        res = amount % 11
        if(res <= 9) {
            return setCode(inputValue+res);
        } else {
            return setCode(inputValue+0);
        }

    }

    return <>
     <Head>
     <title> Штрафов нет</title>
     </Head>

    <main className={s.mainWrap}>
      <div className={s.main}>

        <div>
          <div className={s.title}>
            <div><img src='/w.png'  /></div>
            <span >Штрафов</span>
            <span style={{marginLeft: '10px'}}>нет</span>
          </div>
          <div className={s.titleInfo}> Получение информации о штрафе по УИН</div>
        </div>

        <div style={{marginTop: '40px'}}>
            <div className={s.inputGroup}>
                <input value={inputValue} onChange={onChange} type="text" placeholder={'Введите УИН'}/>
                <button onClick={onClick}> Найти</button>
            </div>

            {(
                (inputValue.length > 10 && inputValue.length < 19)
               || (inputValue.length > 20 && inputValue.length < 24)
            ) && <div className={s.help}>Длина УИН должна быть 20 или 25 цифр</div>}
            {code.length > 0 && <div className={s.help}>{code}</div>}

        </div>
          {
              status === 'success' && state.fines.length > 0 ?  <Fine fines={state.fines}/> :
              status === 'loading' ? <Loading/> :
              status === 'fail' ? <Fail fine={inputValue}/> : <></>
          }

      </div>
    </main>
  </>

}
export default Search

const Fail = (props: { fine: string }) => {
  return <div className={s.resultContainer}>
      <img src="/notFound.png" alt=""/>
      <span> Штраф {props.fine} не найден</span>
  </div>
}
const Loading = () => {
    return <div className={s.resultContainer}>
        <div> <Preloader/></div>
        <span> Загрузка</span>
    </div>
}





