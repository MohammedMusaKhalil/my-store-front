import { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Api from "../../../../tools/api";
import { AppContext } from "../../../layout/Layout";
import Button from "react-bootstrap/Button";
import AddCategory from './AddCategory';
import EditCategory from './EditCategory'; // استيراد المكون الجديد
import Dashboard from "../dashboard";
import Loading from '../../../shared/Loading';

export default function AdminCatigori() {
  const [state, setState] = useState({
    name: "",
    desc: "",
  });
  const [showAddCatForm, setShowAddCatForm] = useState(false); // حالة النافذة المنبثقة
  const [showEditCatForm, setShowEditCatForm] = useState(false); // حالة النافذة المنبثقة لتعديل الفئة
  const [selectedCategory, setSelectedCategory] = useState(null); // الفئة المحددة للتعديل
  const [loading, setLoading] = useState(false);

  const handleCloseAddCatForm = () => {
    setShowAddCatForm(false);
  };

  const handleShowAddCatForm = () => {
    setShowAddCatForm(true);
  };

  const handleCategoryAdded = () => {
    fetchCategories(); // Refresh categories after a new one is added
  };

  const handleShowEditCatForm = (category) => {
    setSelectedCategory(category);
    setShowEditCatForm(true);
  };

  const handleCloseEditCatForm = () => {
    setShowEditCatForm(false);
  };

  const appContext = useContext(AppContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await Api.fetch({ url: 'categories' });
      setLoading(false);
      setCategories(response.data);
   } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async categoryId => {
    try {
      await Api.fetch({
        url: `deletecategory/${categoryId}`,
        method: 'DELETE',
        token: localStorage.getItem('token')
      });
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <Dashboard/>
    <div className="main_content">
      <div  style={{width:'100%',height:'50px',textAlign:'center',marginTop:"10px"}}>
        <span className="subtitle">All catigory in Website</span>
      </div>
      <Button onClick={handleShowAddCatForm} style={{marginLeft:"90%",backgroundColor:"#9F5449",marginBottom:"10px",border:'none'}} >Add Cat</Button> 
      <br />
          {loading ? (
            
            <Loading /> // عرض عنصر التحميل إذا كانت حالة التحميل صحيحة
          ) : (
      <div className="table-responsive" style={{ margin: '20px' }}>
      <Table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.desc}</td>
              <td>
                <Button style={{margin:"10px"}} variant="danger" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                <Button variant="primary" onClick={() => handleShowEditCatForm(category)}>Update</Button> {/* زر التعديل */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>)}
      <AddCategory show={showAddCatForm}  handleClose={handleCloseAddCatForm} fetchCatigore={fetchCategories} />
      <EditCategory show={showEditCatForm} handleClose={handleCloseEditCatForm} category={selectedCategory} fetchCategories={fetchCategories} /> {/* إضافة نموذج تعديل الفئة */}
    </div>
    </div>
  );
}
