using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyAudio
{
  public class MyMeanBuffer
  {

    private int mSize = 1;
    private List<double> mStack;
    private double mValue = 0.0;

    public double Value { get { return mValue; } }

    public double Size { get { return mValue; } }

    public MyMeanBuffer(int size)
    {
      mSize = Math.Min(Math.Max(size, 1), 1000);
      mStack = new List<double>(mSize+1);
      for (var i = 0; i < mSize; i++)
        mStack.Add(0.0);
    }

    public void Push(double value)
    {
      double mean = value / (double) mSize;
      double old = mStack.First();
      mStack.RemoveAt(0);
      mStack.Add(mean);
      mValue += mean;
      mValue -= old;
    }


  }
}
