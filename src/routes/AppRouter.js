import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../components/Login';
import SpeechToText from '../components/SpeechToText';


export const AppRouter = () => {

		return (
				<BrowserRouter>
						<Routes>
								<Route path="/" element={<Login />}/>
								<Route path="/chat" element={<SpeechToText />}/>
						</Routes>
				</BrowserRouter>
		)
}
