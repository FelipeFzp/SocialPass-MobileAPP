export abstract class FileHelper {

  

    public static generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
        var canvas: any = document.createElement("canvas");
        var image = new Image();
     
        image.onload = () => {
          var width = image.width;
          var height = image.height;
     
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
     
          ctx.drawImage(image, 0, 0, width, height);
     
          // IMPORTANT: 'jpeg' NOT 'jpg'
          var dataUrl = canvas.toDataURL('image/jpeg', quality);
     
          callback(dataUrl)
        }
        image.src = img;
      }

      public static createThumbnail(bigImg: string) {

        this.generateFromImage(bigImg, 200, 200, 0.5, data => {
          const smallImg = data;
          return smallImg;
        });
      }

    public static fileToBlob(file): Promise<Blob> {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imgBlob = new Blob([reader.result], {
                    type: file.type
                });

                resolve(imgBlob);
            }

            reader.readAsArrayBuffer(file);
        });
    }

    public static fileToBase64(file): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(<string>reader.result);
            }

            reader.readAsDataURL(file);
        });
    }

    public static cordovaFilePathToFile(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window['resolveLocalFileSystemURI'](path, entry => {
                entry['file'](file => {
                    console.log({ file, entry });
                    resolve(file);
                });
            });
        });
    }

    public static base64ToFile(base64: string, filename: string): any {
        const mimeType = (base64.match(/^data:([^;]+);/) || '')[1];

        return (fetch(base64)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }))
        );
    }
}