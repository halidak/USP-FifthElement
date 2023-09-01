import React, { useState, useContext } from 'react'
import Header from '../common/header/Header'
import Home from '../home/Home'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Footer from '../common/footer/Footer'
import About from "../notices/About"
import NoticeDetail from '../notices/NoticeDetail'
import CompaniesPage from '../companies/CompaniesPage'
import CompanyDetail from '../companies/CompanyDetail'
import LoginForm from '../forms/LoginForm'
import SingInStudentForm from '../forms/SignUpStudentForm'
import EditProfile from '../forms/EditProfile'
import VerifyAccount from '../forms/VerifyAccount'
import ForgotPassword from '../forms/ForgotPassword'
import ResetPassword from '../forms/ResetPassword'
import SignInCompanyForm from '../forms/SignUpCompanyForm'
import LoginCompanies from '../forms/LoginCompanies'
import VerifyAccountCompany from '../forms/VerifyAccountCompany'
import CompanyEditProfile from '../forms/CompanyEditProfile'
import NoticesByCompany from '../notices/NoticesByCompany'
import EditNoticeForm from '../forms/EditNoticeForm'
import AddNoticeForm from '../forms/AddNoticeForm'
import Applied from '../notices/Applied'
import NoticeApplication from '../forms/NoticeApplication'
import Students from '../notices/Students'
import AdminPage from '../admin/AdminPage'
import RequireAuth from '../../hooks/RequireAuth'
import RequireAuthC from '../../hooks/RequiteAuthC'
import Chat from '../chat/Chat'
import AllChats from '../chat/AllChats'
import FavNotices from '../notices/FavNotices'

const Pages = () => {
  
  const [search, setSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [jobTypeSearch, setJobTypeSearch] = useState('');
  const userForgot = `https://localhost:7029/api/User/forgot-password/`;
  const userReset = `https://localhost:7029/api/User/reset-pasword/`;
  const login = '/login';
  const companyLogin = '/login-companies';
  const companyForgot = `https://localhost:7029/api/Company/forgot-password/`;
  const companyReset = `https://localhost:7029/api/Company/reset-pasword/`;
  const [succApply, setSuccApply] = useState();
  const [showChat, setShowChat] = useState(false);
  const [open, setOpen] = useState(false);
  var fav = true;
  const [fromId, setFromId] = useState();
 
  return (
    <>
      <Router>
      {window.location.pathname !== '/admin' ? <Header setShowChat={setShowChat} setOpen={setOpen}/> : null}
        <Routes>
            <Route exact path='/' element={<Home setSearch={setSearch} setLocationSearch={setLocationSearch} setJobTypeSearch={setJobTypeSearch}/>}/>
            <Route exact path='/prakse'element={<About search={search} locationSearch={locationSearch} jobTypeSearch={jobTypeSearch} setSearch={setSearch} setLocationSearch={setLocationSearch} setJobTypeSearch={setJobTypeSearch}/>}/>
            <Route path='/prakse/:noticeId' element={  <NoticeDetail succApply={succApply}/>}/>
            <Route exact path='/poslodavci' element={ <CompaniesPage />}/>
            <Route path='/poslodavci/:companyId' element={ <CompanyDetail />} />
            <Route exact path='/login' element={<LoginForm />} />
            <Route exact path='/sign-in-students' element={<SingInStudentForm />} />
            <Route exact path='/verify/:token' element={<VerifyAccount />}/>
            <Route exact path='/forgot' element={ <ForgotPassword link={userForgot}/>}/>
            <Route exact path='/reset/:token' element={<ResetPassword link={userReset} login={login}/>} />
            <Route exact path='/signup-companies' element={ <SignInCompanyForm />} />
            <Route exact path='/login-companies' element={ <LoginCompanies />}/>
            <Route exact path='/verify-company/:token' element={<VerifyAccountCompany />}/>
            <Route exact path='/edit-company/:companyId' element={<CompanyEditProfile />}/>
            <Route exact path='/forgot-company' element={<ForgotPassword link={companyForgot}/>}/>
            <Route exact path='/reset-company/:token' element={<ResetPassword login={companyLogin} link={companyReset}/>}/>
            <Route exact path='/praksa-forma/:noticeId' element={ <EditNoticeForm/>}/>
            <Route exact path='/prijave' element={<Applied />}/>
            <Route element={<RequireAuthC />}>
            <Route exact path='/company-notices' element={<NoticesByCompany />}/>
            <Route exact path='/add-notice' element={ <AddNoticeForm />}/>
            <Route exact path='/students/:noticeId' element={ <Students setShowChat={setShowChat} setFromId={setFromId} fromId={fromId}/>}/>
            </Route>
            <Route element={<RequireAuth/>}>
            <Route exact path='/notice-application/:noticeId' element={<NoticeApplication setSuccApply={setSuccApply}/>}/>
            <Route exact path='/edit-user/:userId' element={<EditProfile />} />
            <Route exact path='/admin' element={<AdminPage />} />
            <Route exact path='/favorites' element={<FavNotices fav={fav} />}/>
            </Route>
        </Routes>
         <AllChats setOpen={setOpen} open={open} setShowChat={setShowChat} setFromId={setFromId} fromId={fromId} showChat={showChat}/>
        {showChat && <Chat setShowChat={setShowChat} fromId={fromId}/>}
        {window.location.pathname !== '/admin' ? <Footer /> : null}
      </Router>
    </>
  )
}

export default Pages

