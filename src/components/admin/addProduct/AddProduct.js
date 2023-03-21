import { async } from '@firebase/util';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config'
import { selectProducts } from '../../../redux/slice/productSlice';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from './AddProduct.module.scss';

const categories = [
  { id: 1, name: "المشويات" },
  { id: 2, name: "الخضار المتفرز" },
  { id: 3, name: "سمبوسك" },
  { id: 4, name: "الدجاج" },
  { id: 5, name: "حمام" },
  { id: 6, name: "كروكيت" },
  { id: 7, name: "بشاميل" },
  { id: 8, name: "رقاق" },   
  { id: 9, name: "مكرونات" }  ,
  { id: 10, name: "بط" },
  { id: 11, name: "خضار متفرز" },
  { id: 12, name:"مجمدات" },
  { id: 13, name:"وجبات رمضان" },
  { id: 14, name:"عروض اليوم" },
]; 
const initailState = {
  name:'',
  imageUrl:'',
  price: 0,
  category: '',
  desc:'',
};
const AddProduct = () => {
  const {id} = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) =>item.id === id )
  console.log(productEdit);

  const [product,setProduct] = useState(
    ()=>{
      const newState = detectForm(id,{...initailState},productEdit)
      return newState;
    }
  )

  const navigate = useNavigate();
  const [uploadProgress,setUploadProgress] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  


  function detectForm(id,f1,f2){
    if(id === 'ADD' ) {
      return f1;
    }else{
      return f2;
    }
  }


  const handelInputChange = (e) => {
    const {name , value} = e.target;
    setProduct({
      ...product, [name] : value
    })

  };
  const handelImageChange = (e) => {
    const file = e.target.files[0];
    //console.log(file);
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
    
    }, 
    (error) => {
      toast.error(error.message);
    }, 
    () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

      setProduct({
        ...product, imageUrl: downloadURL
      })
      toast.success('تم رفع الصورة');
    });
  }
);

  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setIsLoading(true);
    try{
      const docRef = addDoc(collection (db, "products"), {
        name:product.name,
        imageUrl:product.imageUrl,
        price: Number(product.price),
        category: product.category,
        desc:product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({...initailState});
      toast.success('تم أضافة الطلب');
      navigate('/admin/all-products');
    }catch(error){
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

      if(product.imageUrl !== productEdit.imageUrl){
      const storageRef = ref(storage,productEdit.imageUrl)
      deleteObject(storageRef);
    }

    try{
      setDoc(doc(db, "products", id), {
        name:product.name,
        imageUrl:product.imageUrl,
        price: Number(product.price),
        category: product.category,
        desc:product.desc,
        createdAt: productEdit.createdAt,
        editedAt:Timestamp.now().toDate(),
    });
    setIsLoading(false);
    toast.success('تم تعديل علي الطلب بنجاح');
    navigate('/admin/all-products');
    }catch(err){
      setIsLoading(false);
      toast.error(err.message);
    }
  }

  

  return (
    <>
    {isLoading && <Loader />}
      <div className={styles.product}>
      <h2>{detectForm(id,"Add New product" , "Edit Product")}</h2>
      <Card className={styles.card}>
        <form onSubmit={detectForm(id,addProduct,editProduct)}>
          <label>
            اسم الطلب : 
          </label>
            <input type='text' placeholder='ادخل اسم الطلب' required
            value={product.name} name='name' 
            onChange={(e) =>handelInputChange(e)}/>
          <label>
            صورة الطلب : 
          </label>
          <Card CardClass={styles.group}>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div className={styles['progress-bar']} style={{width: `${uploadProgress}%`}}>
                      {uploadProgress < 100 ? `UPLOADING ${uploadProgress}%` : 
                      `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}
                        <input 
              type='file' 
              placeholder='ارفع صورة الطلب' 
              name='image' 
              accept='image/*'
              onChange={(e) => handelImageChange(e) }
            />
            {product.imageUrl === '' ? null : (
                          <input 
                          type='text' 
                          required 
                          name='imageUrl' 
                          disabled 
                          value={product.imageUrl}
                          placeholder='Image Url'/>
            )}
            </Card>
            <label>
            السعر : 
            </label>
            <input type='number' placeholder='Product Price' required
            value={product.price} name='price' 
            onChange={(e) =>handelInputChange(e)}/>
            <label>
            الصنف : 
            </label>
            <select required name='category' value={product.category} onChange={(e) => handelInputChange(e)}>
              <option value='' disabled>اختر الصنف </option>
              {
                categories.map((category)=> (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))
              }
            </select>
            <label>
            وصف الطلب : 
            </label>
            <textarea name='desc' value={product.desc} onChange={(e) => {handelInputChange(e)}}
            cols='30' row='10'
            >
            </textarea>
            <button className='--btn --btn-primary'>{detectForm(id,'Add Product' , 'Edit Product')}</button>
        </form>
      </Card>
    </div>
    </>
  )
}

export default AddProduct
