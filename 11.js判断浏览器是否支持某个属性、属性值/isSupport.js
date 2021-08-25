// 例子：判断是否支持某个属性, 是否存在key
if ('WebkitTransform' in document.body.style 
 || 'MozTransform' in document.body.style 
 || 'OTransform' in document.body.style 
 || 'transform' in document.body.style) 
{
    alert('I can Rotate!');
}