import './tours.scss'
import TourCard from './tourCard/tourCard'

const testData = {
    "id": 0,
    "title": "Anantara Al Jabal Al Akhdar Resort — Nizwa, Oman",
    "description": "Set in the sunburnt Al-Hajar mountains, on the rim of the Arabian Peninsula’s most outrageously beautiful canyon, is Anantara Al Jabal Al Akhdar Resort—the region’s most ambitious wilderness hotel. The space has souped up Oman’s wild frontier to the max, with chasm-facing pool villas, majlis-style courtyards, a lantern-lit outdoor hookah space, and super-slick service. This being the splashy Gulf of Oman, there has to be a superlative or two: The hotel has the highest swimming pools, tennis court, and stargazing platform in the Middle East. But its real essence is pure escapism, whether rappelling down the side of a mountain or relaxing in the impeccable spa with its energizing hammam rituals and fragrant frankincense oils. It’s a bold, almost transcendental experiment in off-the-map tourism, and at the vanguard of a growing number of Middle Eastern hotels opening in unexpected and wonderfully extreme locations.",
    "price": "457$",
    "imageUrl": "https://media.cntraveler.com/photos/5f68161d68f371240312a111/master/w_400%2Cc_limit/Anantara-Al-Jabal-Al-Akhdar-Resort.jpg"
}
const Tours = () => {
    return (
        <div className='tours'>
            <h1>Tours</h1>
            <TourCard tour={testData}/>
        </div>
    )
}

export default Tours;