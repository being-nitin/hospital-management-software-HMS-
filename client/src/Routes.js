import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import AdminDashboard from "./user/AdminDashboard";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import PatientRoute from "./auth/PatientRoute";
import DoctorRoute from "./auth/DoctorRoute";
import Profile from "./user/Profile";
import ListUsers from "./admin/ListUsers";
import ListCatTest from "./admin/ListCatTest";
import CreateTestCat from "./admin/CreateTestCat";
import CatTestUpdate from "./admin/CatTestUpdate";
import ListTestResult from "./admin/ListTestResult";
import CreateTest from "./admin/CreateTest";
import TestUpdate from "./admin/TestUpdate";
import ListTreatment from "./admin/ListTreatment";
import CreateTreatment from "./admin/CreateTreatment";
import TreatmentUpdate from "./admin/TreatmentUpdate";
import AddPrescription from "./admin/AddPrescription";
import ListPrescriptions from "./admin/ListPrescriptions";
import UpdatePrescriptions from "./admin/UpdatePrescriptions";
import AddPatientDetails from "./admin/AddPatientDetails";
import ListPatients from "./admin/ListPatients";
import UpdatePatientProfile from "./admin/UpdatePatientProfile";
import ListBuildings from "./admin/ListBuildings";
import AddBuilding from "./admin/AddBuilding";
import UpdateBuilding from "./admin/UpdateBuilding";
import ListFloors from "./admin/ListFloors";
import AddFloor from "./admin/AddFloor";
import UpdateFloor from "./admin/UpdateFloor";
import UpdateUsers from "./admin/UpdateUsers";
import AddUsers from "./admin/AddUsers";
import ListDeparts from "./admin/ListDeparts";
import AddDepartment from "./admin/AddDepartment";
import UpdateDepartment from "./admin/UpdateDepartment";
import ListDesignate from "./admin/ListDesignate";
import AddDesignation from "./admin/AddDesignation";
import UpdateDesignation from "./admin/UpdateDesignation";
import ListSpecialize from "./admin/ListSpecialize";
import AddSpecialization from "./admin/AddSpecialization";
import UpdateSpecialize from "./admin/UpdateSpecialize";
import FileUpload from "./admin/FileUpload";
import ListVendors from "./admin/ListVendors";
import ListDoctors from "./admin/ListDoctors";
import AddDoctorDetails from "./admin/AddDoctorDetails";
import UpdateDoctorProfile from "./admin/UpdateDoctorProfile";
import ListExpenses from "./admin/ListExpenses";
import AddExpense from "./admin/AddExpense";
import UpdateExpenses from "./admin/UpdateExpenses";
import PatDetails from "./admin/PatDetails";
import ListMedicine from "./admin/ListMedicine";
import AddMedicine from "./admin/AddMedicine";
import UpdateMedicine from "./admin/UpdateMedicine";
import ListVaccineCat from "./admin/ListVaccineCat";
import AddVaccineCat from "./admin/AddVaccineCat";
import UpdateVaccineCat from "./admin/UpdateVaccineCat";
import ListAppVaccine from "./admin/ListAppVaccine";
import AddAppVaccine from "./admin/AddAppVaccine";
import UpdateVaccApp from "./admin/UpdateVaccApp";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./actions/userActions";

import PatientHistory from "./component/patientHistory";
import AppointmentDetail from "./component/appointmentDetail";
import PrescriptionForm from "./component/prescriptionForm";
import TimelineCalendar from "./component/timeline";
import Psychodiagnostic from "./component/Psychodiagnostic";
import Hamilton from "./component/Hamilton";
import ViewPDReport from "./component/viewpsychodiagnosticreport";
import HamAView from "./component/viewHamiltionForm";
import ClinicalNotes from "./component/clinicalNotes";
import HamiltonDepressionForm from "./component/HamiltionS";
import CDRSForm from "./component/CDRS";
import PanssForm from "./component/panss";
import YMRSform from "./component/YMRSform";
import InvoiceLayout from "./component/billingDetail";
import YBOCS from "./component/YBOCS";
import TreatmentList from "./component/Treatment";
import PrintDetails from "./component/PrintDetails";
import AddClinicalNotes from "./component/addClinicalNotes";
import AssignRoles from "./component/AssignRoles";
import PrintAppointments from "./component/view/printApointment";

const Routes = () => {
	const userLogin = useSelector((state) => state.userLogin);
	console.log(userLogin);
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/signin" exact element={<Signin />} />
				<Route element={<AdminRoute />}>
					<Route path="/" element={<AdminDashboard />} />
					<Route path="/calendar" element={<TimelineCalendar />} />
					<Route path="/profile/:userId" element={<Profile />} />
					<Route path="/update/users/:id" element={<UpdateUsers />} />
					<Route path="/test-result" element={<ListTestResult />} />
					<Route path='/print-prescription/:id' element={<PrintAppointments/>}/>
					<Route
						path="/list-prescriptions"
						element={<ListPrescriptions />}
					/>
					<Route
						path="/update-cat-test/:catTestId"
						element={<CatTestUpdate />}
					/>

					<Route path="/billing/:id" element={<InvoiceLayout />} />
					<Route
						path="/update-test/:testId"
						element={<TestUpdate />}
					/>
					<Route
						path="/update-prescription/:id"
						element={<UpdatePrescriptions />}
					/>
					<Route
						path="/psychodiagnosticreport/:id"
						element={<ViewPDReport />}
					/>
					<Route
						path="/patient-history"
						element={<PatientHistory />}
					/>
					<Route
						path="/update-building/:id"
						element={<UpdateBuilding />}
					/>
					<Route
						path="/update-designation/:id"
						element={<UpdateDesignation />}
					/>
					<Route path="/update-floor/:id" element={<UpdateFloor />} />
					<Route
						path="/update-expenses/:id"
						element={<UpdateExpenses />}
					/>
					<Route
						path="/update-doctor/:id"
						element={<UpdateDoctorProfile />}
					/>
					<Route
						path="/update-depart/:id"
						element={<UpdateDepartment />}
					/>
					<Route
						path="/update-patient/:id"
						element={<UpdatePatientProfile />}
					/>
					<Route
						path="/update-specialize/:id"
						element={<UpdateSpecialize />}
					/>
					<Route
						path="/update-medicine/:id"
						element={<UpdateMedicine />}
					/>
					<Route
						path="/update-vaccine-cat/:id"
						element={<UpdateVaccineCat />}
					/>
					<Route
						path="/update-vacc-app/:id"
						element={<UpdateVaccApp />}
					/>
					<Route
						path="/update-treatment/:treatmentId"
						element={<TreatmentUpdate />}
					/>
					<Route path="/list/users" element={<ListUsers />} />

					<Route path="/list/medicine" element={<ListMedicine />} />
					<Route path="/list-cat-test" element={<ListCatTest />} />
					<Route path="/list-patients" element={<ListPatients />} />
					<Route path="/list-treat-cat" element={<ListTreatment />} />
					<Route path="/list-buildings" element={<ListBuildings />} />
					<Route path="/list-floors" element={<ListFloors />} />
					<Route path="/list-departs" element={<ListDeparts />} />
					<Route path="/list-vendors" element={<ListVendors />} />
					<Route path="/list-doctors" element={<ListDoctors />} />
					<Route
						path="/list-app-vaccine"
						element={<ListAppVaccine />}
					/>
					<Route
						path="/list-app-vaccine/:id"
						element={<AppointmentDetail />}
					/>

					<Route
						path="/clinicalNotes/:id"
						element={<ClinicalNotes />}
					/>

					<Route
						path="/viewHamiltomForm/:id"
						element={<HamAView />}
					/>
					<Route
						path="/PsychologicalForm/:id"
						element={<Psychodiagnostic />}
					/>
					<Route path="/panss/:id" element={<PanssForm />} />
					<Route path="/HamiltonForm/:id" element={<Hamilton />} />
					<Route path="/cdrs/:id" element={<CDRSForm />} />
					<Route
						path="/hamD/:id"
						element={<HamiltonDepressionForm />}
					/>
					<Route path="/ybocs/:id" element={<YBOCS />} />
					<Route path="/ymrs/:id" element={<YMRSform />} />
					<Route path="/list-designate" element={<ListDesignate />} />
					<Route path="/list-expenses" element={<ListExpenses />} />
					<Route
						path="/list-specialize"
						element={<ListSpecialize />}
					/>
					<Route
						path="/list-vaccine-cat"
						element={<ListVaccineCat />}
					/>
					<Route
						path="/create/cat-test"
						element={<CreateTestCat />}
					/>
					<Route
						path="/add-prescription/:id"
						element={<AddPrescription />}
					/>
					<Route
						path="/create/cat-treatment"
						element={<CreateTreatment />}
					/>
					<Route path="/create-test" element={<CreateTest />} />
					<Route path= "/clinical-notes" element={<AddClinicalNotes/>} />
					<Route path="/roles" element={<AssignRoles/>}/>
					<Route 
						path="/add-patient-details"
						element={<AddPatientDetails />}
					/>
					<Route path="/pat-details/:id" element={<PatDetails />} />
					<Route path="/add-building" element={<AddBuilding />} />
					<Route path="/add-floor" element={<AddFloor />} />
					<Route path="/add-users" element={<AddUsers />} />
					<Route
						path="/add-appointment/:id"
						element={<AddAppVaccine />}
					/>
					<Route path="/add-medicine" element={<AddMedicine />} />
					<Route path="/add-expenses" element={<AddExpense />} />
					<Route path="/add-vac-cat" element={<AddVaccineCat />} />
					<Route path="/add-depart" element={<AddDepartment />} />
					<Route path="/add-designate" element={<AddDesignation />} />
					<Route path="/add-doctor" element={<AddDoctorDetails />} />
					<Route
						path="/add-specialize"
						element={<AddSpecialization />}
					/>
					<Route path="/file-upload" element={<FileUpload />} />
					<Route path="/print-details" element={<PrintDetails />} />
					<Route path="/treatments" element={<TreatmentList />} />
				</Route>

				<Route element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
