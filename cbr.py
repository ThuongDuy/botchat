import numpy as np 
import pandas as pd

data_tuong_dong = pd.read_excel('độ_tương_đồng.xlsx')
data_trong_so = pd.read_excel('trọng_số.xlsx')
tuong_dong = dict([(i,x) for i,x in zip(data_tuong_dong['Kí kiệu'], data_tuong_dong['Giá trị'],)])
trong_so=data_trong_so.to_dict('list')

key=['TT','ĐB','N','CN','P','KV','CB','ƠC','BT','VD','S']
def problem (a):
    p=[]
    for i in range(len(key)):
        p.append(key[i]+str(a[i]))
    return p

def max_case_i (case,mau,benh):
    s=[]
    pl=problem(mau)
    for i in case:
        a=0
        for j in range(11):
            d=0
            try:
                key=pl[j]+'-'+case[i][j]
                d=tuong_dong[key]
            except:
                key=case[i][j]+'-'+pl[j]
                d=tuong_dong[key]
            a=a+trong_so[benh][j]*d
        a=a/sum(trong_so[benh])
        s.append(a)
    return max(s);
data={'Bệnh tả':0, 'Xơ gan' : 0, 'Loét dạ dày tá tràng':0, 'Viêm tụy cấp':0, 'Viêm gan virus B mạn tính':0,
'Viêm gan virus C':0, 'Viêm gan do rượu':0, 'Sỏi mật':0, 'Lỵ trực trùng':0, 'Lỵ Amip':0, 'Bệnh thương hàn':0,'Không bị bệnh về đường tiêu hóa':0}
def cbr(input):
    index=0
    for i in data:
        benh=pd.read_excel('case_cbr.xlsx',sheet_name=index)
        case_benh= dict([(i,[x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11]) for i,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11 in zip(benh["STT"],benh['Trạng thái cơ thể'],benh['Vị trí đau bụng'],
        benh['Nôn hoặc buồn nôn'], benh['Trạng thái cân nặng'],benh['Trạng thái phân'],benh['Khẩu vị'],
        benh['Đầy bụng, chướng bụng'], benh['Ợ chua'], benh['Xuất hiện các vết bầm tím dưới da'], benh['Vàng da'], benh['Nhiệt độ cơ thể'])])
        data[i]=max_case_i(case_benh,input,i)
        index=index+1
    kq='Bệnh tả'
    values=data['Bệnh tả']
    for i in data:
        if(data[i]>values):
            values=data[i]
            kq=i
    data_dieu_tri = pd.read_excel('điều_trị.xlsx')
    dieu_tri=dict([(i,x) for i,x in zip(data_dieu_tri['Các bệnh đường tiêu hóa'], data_dieu_tri['Điều trị'],)])
    ket_luan={'chandoan':'','dieutri':''}
    if(kq!='Không bị bệnh về đường tiêu hóa'):
        ket_luan['dieutri']=dieu_tri[kq]
        if(values>=0.9):
            ket_luan['chandoan'] = 'Bạn bị : '+kq
        elif (values>0.8):
            ket_luan['chandoan'] = 'Bạn có nguy cơ cao mắc : '+kq
        elif (values>=0.5):
            ket_luan['chandoan'] = 'Nghi ngờ mắc : '+kq
        elif (values>0):
            ket_luan['chandoan'] = 'Bạn có một số triệu chứng mắc '+kq+' cần theo dõi thêm'
        else:
            ket_luan['chandoan'] = 'Chúng tôi chưa thể đưa ra kết luận'
    else:
        if(values>=0.5):
            ket_luan['chandoan'] = 'Bạn không bị mắc các bệnh đường tiêu hóa'
        elif (values>0):
            ket_luan['chandoan'] = 'Bạn có thể có nguy cơ mắc các bệnh khác cần theo dõi thêm'
        else:
            ket_luan['chandoan'] = 'Chúng tôi chưa thể đưa ra kết luận'
    return ket_luan
