'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Upload() {
  const router= useRouter()
  const [image, setImage] = useState(null)
  const [imgUrl, setImgUrl] = useState('')
  const [btn1, setBtn1] = useState(false)
  const [btn2, setBtn2] = useState(false)

  const [msg, setMsg] = useState('')

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [place, setPlace] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  let today=`${new Date().getFullYear()}-${(new Date().getMonth()+1)<10?('0'+(new Date().getMonth()+1)):(new Date().getMonth()+1)}-${new Date().getDate()<10?('0'+new Date().getDate()):(new Date().getDate())}`
    console.log(today)

  const defaultImageUrl =
    'https://png.pngtree.com/png-vector/20221016/ourmid/pngtree-upload-file-vector-single-icon-clipart-transparent-background-png-image_6318311.png';

  const backgroundImage = imgUrl ? `url(${imgUrl})` : `url(${defaultImageUrl})`;
  const btn1Cont = btn1 ? `Uploading...` : `Upload Poster`;
  const btn2Cont = btn2 ? `Wait...` : `Upload`;

  function uploadPoster() {
    setBtn1(true)
    if (image) {
      const formData = new FormData()
      formData.append('file', image)

      console.log(formData['file'])
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/uplode_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        console.log(res)
        setImgUrl(res.data.imageUrl)
        setMsg(res.data.message)
        setBtn1(false)
      }).catch((err) => {
        console.log(err)
        setMsg(err.response?.data?.error || err.response?.data?.message || err.message)
        setBtn1(false)
      })
    }else{
      setMsg("Select a poster first.")
      setBtn1(false)
    }
  }

  function uploadJatra() {
    setBtn2(true)
    let partyId = localStorage.getItem('partyId')
    if (imgUrl == '') {
      setMsg('Upload a poster for jatra.')
      setBtn2(false)
    } else if (title == '' || desc == '' || price == '' || place == '' || city == '' || date == '' || time == '') {
      setMsg('Enter all required inputs.')
      setBtn2(false)
    } else {
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/add_jatra`, {
        'title': title,
        'description': desc,
        'poster': imgUrl,
        'ticket_price': price,
        'place': place,
        'city': city,
        'date': date,
        'time': time + ':00',
        'jatra_party_id': partyId
      }).then((res) => {
        console.log(res.data)
        setMsg(res.data.message)
        setTitle('')
        setDesc('')
        setPrice('')
        setImgUrl('')
        setCity('')
        setPlace('')
        setDate('')
        setTime('')
        setBtn2(false)
        router.push('/myJatra')
      }).catch((err) => {
        console.error(err)
        setMsg(err.response?.data?.message || err.response?.data?.error || err.message)
        setBtn2(false)
      })
    }
  }

  return (
    <section className="bg-[#6750A4] h-[100vh] py-4 overflow-y-scroll flex flex-wrap justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-sm font-nunito">Select a poster image</p>
        <div className="w-[230px] h-[300px] bg-center bg-[#D9D9D9] bg-cover rounded-md flex justify-center items-center" style={{ backgroundImage }}>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" className="w-full h-full opacity-0" accept="image/*" />
        </div>
        <button onClick={uploadPoster} className="bg-[#323131] font-nunito px-4 py-2 rounded-lg transition-all hover:scale-95">{btn1Cont}</button>
        <p className="text-sm font-mono text-center">{msg}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-[300px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0" placeholder="Jatra Title" />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={'5'} className="w-[300px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0 resize-none" placeholder="Description"></textarea>
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="w-[300px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0" placeholder="Ticket Price" />
        <input value={place} onChange={(e) => setPlace(e.target.value)} type="text" className="w-[300px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0" placeholder="Place" />
        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="w-[300px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0" placeholder="City Name" list="cityList" />
        <datalist id="cityList" className="font-nunito">
          <option>Balasore</option>
          <option>Bhubaneswar</option>
          <option>Cuttack</option>
          <option>Berhampur</option>
          <option>Rourkela</option>
          <option>Sambalpur</option>
          <option>Puri</option>
          <option>Bhadrak</option>
          <option>Baripada</option>
          <option>Jeypore</option>
          <option>Jharsuguda</option>
          <option>Kendrapada</option>
          <option>Rayagada</option>
          <option>Anugul</option>
          <option>Dhenkanal</option>
          <option>Soro</option>
          <option>Paralakhemundi</option>
          <option>Sunabeda</option>
          <option>Malkangiri</option>
          <option>Phulbani</option>
          <option>Keonjhar</option>
          <option>Bolangir</option>
          <option>Sundergarh</option>
          <option>Nayagarh</option>
          <option>Jatni</option>
          <option>Khordha</option>
          <option>Talcher</option>
          <option>Deogarh</option>
          <option>Subarnapur</option>
          <option>Padampur</option>
          <option>Rajgangpur</option>
          <option>Titlagarh</option>
          <option>Umerkote</option>
          <option>Kendrapara</option>
          <option>Bargarh</option>
          <option>Koraput</option>
          <option>Nowrangpur</option>
          <option>Chhatrapur</option>
          <option>Khurda</option>
        </datalist>
        <div className="flex gap-2">
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-nunito">Select Release Date</span>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" min={today} className="w-[140px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-nunito">Select Show Time</span>
            <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="w-[140px] font-lato bg-[#D9D9D9] py-2 px-3 rounded-xl text-black outline-0" />
          </div>
        </div>
        <button onClick={uploadJatra} className="bg-[#323131] font-nunito px-4 py-2 rounded-lg hover:scale-95 transition-all">{btn2Cont}</button>
      </div>
    </section>
  )
}